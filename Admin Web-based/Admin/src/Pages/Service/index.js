import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Popconfirm,
  Radio,
  Row,
  Spin,
  Table,
  Tag,
  Typography,
  Pagination,
  Select,
} from "antd";

import Search from "antd/lib/input/Search";
import { PaperClipOutlined } from "@ant-design/icons";
import BreadcrumbComponent from "../../Component/Breadcrumb";
import { compose } from "recompose";
import { connect } from "react-redux";
import {
  selectDetail,
  selectLoading,
  selectAllService,
  selectTotal,
} from "./store/selector";
import { createStructuredSelector } from "reselect";
import {
  asyncCreateServiceAction,
  asyncDeleteServiceAction,
  asyncEditServiceAction,
  asyncGetAllServiceAction,
  asyncGetDetailServiceAction,
} from "./store/action";
import { useEffect, useState } from "react";
import UploadComponent from "../../Component/UploadComponent";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  DownOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
const { Title } = Typography;
const { Link } = Typography;
const Service = (props) => {
  const {
    getAllService,
    createService,
    deleteService,
    editService,
    ServiceList,
    isLoading,
    total,
    getDetailService,
  } = props;

  //payload
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [id, setId] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [fileListVN, setFileListVN] = useState([]);

  const [formModal] = Form.useForm();

  const [payload, setPayload] = useState({
    search: "",
    paging: {
      pageIndex: 1,
      pageSize: 5,
    },
    sorting: {
      field: "createdAt",
      order: "desc",
    },
  });

  const chooseIsQR = (e) => {
    console.log("radio checked", e.target.value);
  };

  const onDelete = async (id) => {
    const response = await deleteService(id);
    if (response.status === 200) {
      notification["success"]({
        message: "Announcement",
        description: "Delete Success",
      });
      getAllService({
        search: payload.search,
        sort: payload.sorting.field,
        sortOrder: payload.sorting.order,
        page: payload.paging.pageIndex,
        pageSize: payload.paging.pageSize,
      });
    } else {
      notification["error"]({
        message: "Error",
        description: "Something went wrong",
      });
    }
  };

  const onEdit = async (id) => {
    setIsEdit(true);
    setId(id);
    const response = await getDetailService(id);
    if (response?.status === 200) {
      // console.log({
      //   name: response.data.data._id.name,
      //   email: response.data.data._id.email,
      //   phone: response.data.data._id.phone,
      //   isActive: response.data.data._id.isActive,
      // });
      console.log(response);
      formModal.setFieldsValue({
        email: response.data.service.companyID._id.email,
        serviceType: response.data.service.serviceType,
        price: response.data.service.price,
      });
      // const currentImg = [
      //   {
      //     uid: "-1",
      //     name: "image.png",
      //     status: "done",
      //     thumbUrl: response.data.result.rules,
      //   },
      // ];
      // const currentImgVN = [
      //   {
      //     uid: "-1",
      //     name: "image.png",
      //     status: "done",
      //     thumbUrl: response.data.result.rulesVN,
      //   },
      // ];
      // setFileList(currentImg);
      // setFileListVN(currentImgVN);
      setVisible(true);
    } else {
      notification["error"]({
        message: "Error",
        description: "Something went wrong",
      });
    }
  };

  //get initial state
  useEffect(
    () => {
      console.log({
        search: payload.search,
        sort: payload.sorting.field,
        sortOrder: payload.sorting.order,
        page: payload.paging.pageIndex,
        pageSize: payload.paging.pageSize,
      });
      getAllService({
        search: payload.search,
        sort: payload.sorting.field,
        sortOrder: payload.sorting.order,
        page: payload.paging.pageIndex,
        pageSize: payload.paging.pageSize,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [payload]
  );

  const columns = [
    {
      title: "Id",
      key: "id",
      render: (text, record, index) => {
        return (
          <div key={index}>
            {index +
              payload.paging.pageSize * (payload.paging.pageIndex - 1) +
              1}
          </div>
        );
      },
    },
    {
      title: "Company Email",
      key: "account.email",
      dataIndex: "account.email",
      render: (_, record) => {
        return (
          <Link
            key={record._id}
            onClick={() => {
              onEdit(record._id);
            }}
          >
            {record.account[0].email}
          </Link>
        );
      },
      sorter: true,
    },
    // {
    //   title: "Status",
    //   key: "status",
    //   dataIndex: "Account.isActive",
    //   render: (_, record) => {
    //     return (
    //       <Tag
    //         icon={
    //           record.Account[0].isActive ? (
    //             <CheckCircleOutlined />
    //           ) : (
    //             <CloseCircleOutlined />
    //           )
    //         }
    //         color={record.Account[0].isActive ? "green" : "volcano"}
    //       >
    //         {record.icon}
    //       </Tag>
    //     );
    //   },
    //   sorter: true,
    // },
    {
      title: "Company Name",
      key: "account.name",
      dataIndex: "account.name",
      render: (_, record) => {
        return record.account[0].name;
      },
      sorter: true,
    },
    {
      title: "Service Type",
      key: "serviceType",
      dataIndex: "serviceType",
      sorter: true,
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      sorter: true,
    },

    // {
    //   title: "Address",
    //   key: "address",
    //   dataIndex: "address",
    //   sorter: true,
    // },
    // {
    //   title: "Description",
    //   key: "description",
    //   dataIndex: "description",
    //   sorter: true,
    // },
    // {
    //   title: "Created At",
    //   key: "createdAt",
    //   dataIndex: "createdAt",
    //   sorter: true,
    // },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Sure to delete?"
          key={record._id}
          onConfirm={() => {
            onDelete(record._id);
          }}
        >
          <Button key={record.id} danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];
  console.log(props);
  const handleTableChange = (pagination, filters, sorter) => {
    console.log(sorter);
    setPayload({
      ...payload,
      paging: {
        pageIndex: pagination.current,
        pageSize: pagination.pageSize,
      },
      sorting: {
        field: sorter.field,
        order: sorter.order ? sorter.order.slice(0, -3) : "desc",
      },
    });
  };

  const onSearch = async (value) => {
    setPayload({
      ...payload,
      search: value,
      paging: {
        pageIndex: payload.paging.pageIndex,
        pageSize: payload.paging.pageSize,
      },
    });
  };
  const openCreateService = () => {
    formModal.resetFields();
    setVisible(true);
    setIsEdit(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setFileList([]);
    setFileListVN([]);
  };

  const onFinish = async (values) => {
    console.log(values);
    if (isEdit) {
      const response = await editService({ form: values, id: id });
      if (response.status === 200) {
        await getAllService({
          search: payload.search,
          sort: payload.sorting.field,
          sortOrder: payload.sorting.order,
          page: payload.paging.pageIndex,
          pageSize: payload.paging.pageSize,
        });
        notification["success"]({
          message: "Edit success",
        });
        formModal.resetFields();
        handleCancel();
      } else {
        notification["error"]({
          message: `${response.statusText}. ${response.data?.message}`,
        });
      }
    } else {
      const response = await createService(values);
      console.log(response);
      if (response?.status === 201) {
        await getAllService({
          search: payload.search,
          sort: payload.sorting.field,
          sortOrder: payload.sorting.order,
          page: payload.paging.pageIndex,
          pageSize: payload.paging.pageSize,
        });
        notification["success"]({
          message: "Create success",
        });
        formModal.resetFields();
        handleCancel();
      } else {
        notification["error"]({
          message: `${response.statusText}. ${response.data?.message}`,
        });
      }
    }
  };
  return (
    <div>
      <BreadcrumbComponent />
      <Title type="secondary" level={4}>
        Service
      </Title>
      <Row justify="start" style={{ padding: " 10px 0" }}>
        <Col span={8}>
          <Search placeholder="Search ..." onSearch={onSearch} enterButton />
        </Col>
        <Col span={16}>
          <Button
            block={false}
            ghost={false}
            htmlType="button"
            icon={<PaperClipOutlined />}
            loading={false}
            style={{ float: "right" }}
            type="primary"
            onClick={() => openCreateService()}
          >
            Create New Service
          </Button>
        </Col>
      </Row>
      <Table
        onChange={handleTableChange}
        pagination={{
          total: total,
          pageSize: payload.paging.pageSize,
          position: "topCenter",
        }}
        loading={isLoading}
        dataSource={ServiceList}
        columns={columns}
        rowKey="id"
      />

      <Modal
        title={isEdit ? "Edit Service" : "Create Service"}
        open={visible}
        onCancel={handleCancel}
        footer={
          <Button type="primary" htmlType="submit" form="formModal">
            Save
          </Button>
        }
        forceRender
      >
        <Spin tip="Loading..." spinning={isLoading}>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={formModal}
            name="formModal"
            onFinish={onFinish}
          >
            <Form.Item
              name="serviceType"
              label="Service Type"
              rules={[
                {
                  required: true,
                  message: "Service Type is required",
                },
              ]}
              value={formModal.getFieldValue("serviceType") || "Organic"}
            >
              <Select
                disabled={isEdit}
                options={[
                  {
                    value: "Plastic",
                    label: "Plastic",
                  },
                  {
                    value: "Glass",
                    label: "Glass",
                  },
                  {
                    value: "Organic",
                    label: "Organic",
                  },
                  {
                    value: "Hazardous",
                    label: "Hazardous",
                  },
                  {
                    value: "Paper",
                    label: "Paper",
                  },
                  {
                    value: "Metal",
                    label: "Metal",
                  },
                  {
                    value: "E-waste",
                    label: "E-waste",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Company email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input disabled={isEdit} />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Price is required",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  ServiceList: selectAllService,
  total: selectTotal,
  detail: selectDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getAllService: (payload) => asyncGetAllServiceAction(dispatch)(payload),
  getDetailService: (payload) => asyncGetDetailServiceAction(dispatch)(payload),
  createService: (payload) => asyncCreateServiceAction(dispatch)(payload),
  deleteService: (payload) => asyncDeleteServiceAction(dispatch)(payload),
  editService: (payload) => asyncEditServiceAction(dispatch)(payload),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Service);
