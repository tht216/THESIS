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
} from "antd";

import Search from "antd/lib/input/Search";
import { PaperClipOutlined } from "@ant-design/icons";
import BreadcrumbComponent from "../../Component/Breadcrumb";
import { compose } from "recompose";
import { connect } from "react-redux";
import {
  selectDetail,
  selectLoading,
  selectAllCompany,
  selectTotal,
} from "./store/selector";
import { createStructuredSelector } from "reselect";
import {
  asyncCreateCompanyAction,
  asyncDeleteCompanyAction,
  asyncEditCompanyAction,
  asyncGetAllCompanyAction,
  asyncGetDetailCompanyAction,
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
const Company = (props) => {
  const {
    getAllCompany,
    createCompany,
    deleteCompany,
    editCompany,
    CompanyList,
    isLoading,
    total,
    getDetailCompany,
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
    const response = await deleteCompany(id);
    if (response.status === 200) {
      notification["success"]({
        message: "Announcement",
        description: "Delete Success",
      });
      getAllCompany({
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
    const response = await getDetailCompany(id);
    if (response?.status === 200) {
      console.log({
        long: response.data.data.long,
        lat: response.data.data.lat,
        address: response.data.data.address,
        description: response.data.data.description,
        name: response.data.data._id.name,
        email: response.data.data._id.email,
        phone: response.data.data._id.phone,
        isActive: response.data.data._id.isActive,
      });
      formModal.setFieldsValue({
        long: response.data.data.long,
        lat: response.data.data.lat,
        address: response.data.data.address,
        description: response.data.data.description,
        name: response.data.data._id.name,
        email: response.data.data._id.email,
        phone: response.data.data._id.phone,
        isActive: response.data.data._id.isActive,
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
      getAllCompany({
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
      title: "Email",
      key: "email",
      dataIndex: "Account.email",
      render: (_, record) => {
        return (
          <Link
            key={record._id}
            onClick={() => {
              onEdit(record._id);
            }}
          >
            {record.Account[0].email}
          </Link>
        );
      },
      sorter: true,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "Account.isActive",
      render: (_, record) => {
        return (
          <Tag
            icon={
              record.Account[0].isActive ? (
                <CheckCircleOutlined />
              ) : (
                <CloseCircleOutlined />
              )
            }
            color={record.Account[0].isActive ? "green" : "volcano"}
          >
            {record.icon}
          </Tag>
        );
      },
      sorter: true,
    },
    {
      title: "Name",
      key: "Account.name",
      dataIndex: "Account.name",
      render: (_, record) => {
        return record.Account[0].name;
      },
      sorter: true,
    },
    {
      title: "Phone",
      key: "Account.phone",
      dataIndex: "Account.phone",
      render: (_, record) => {
        return record.Account[0].phone;
      },
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
      sorter: true,
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      sorter: true,
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
      sorter: true,
    },
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
  const openCreateCompany = () => {
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
    if (isEdit) {
      const response = await editCompany({ form: values, id: id });
      if (response.status === 200) {
        await getAllCompany({
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
      const response = await createCompany({
        ...values,
        long: +values.long,
        lat: +values.lat,
      });
      console.log(response);
      if (response?.status === 201) {
        await getAllCompany({
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
        Company
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
            onClick={() => openCreateCompany()}
          >
            Create New Company
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
        dataSource={CompanyList}
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
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
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
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true,
                  message: "Phone is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Description is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="long"
              label="Longitute"
              rules={[
                {
                  required: true,
                  message: "Longitute is required",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="lat"
              label="Latitute"
              rules={[
                {
                  required: true,
                  message: "Latitute is required",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Address is required",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {isEdit && (
              <>
                <Form.Item
                  name="isActive"
                  label="Is Active"
                  value={formModal.getFieldValue("isActive") || true}
                  rules={[
                    {
                      required: true,
                      message: "Phone is required",
                    },
                  ]}
                >
                  <Radio.Group onChange={chooseIsQR}>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </>
            )}
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  CompanyList: selectAllCompany,
  total: selectTotal,
  detail: selectDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getAllCompany: (payload) => asyncGetAllCompanyAction(dispatch)(payload),
  getDetailCompany: (payload) => asyncGetDetailCompanyAction(dispatch)(payload),
  createCompany: (payload) => asyncCreateCompanyAction(dispatch)(payload),
  deleteCompany: (payload) => asyncDeleteCompanyAction(dispatch)(payload),
  editCompany: (payload) => asyncEditCompanyAction(dispatch)(payload),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Company);
