import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { GROUPID } from '../../../../util/settings/config';
import { useDispatch } from 'react-redux';
import { themMoiPhimAction } from '../../../../redux/actions/QuanLyPhimActions';


const AddNew = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState("");

  const dispatch = useDispatch();
  const formik =useFormik({
    initialValues:{
        tenPhim:'',
        trailer:'',
        moTa:'',
        ngayKhoiChieu:'',
        dangChieu:false,
        sapChieu:false,
        hot:false,
        danhGia:0,
        hinhAnh:{},
        
    },
    onSubmit:(values)=>{
      values.maNhom = GROUPID;
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      dispatch(themMoiPhimAction(formData));
    }
  })

  const handleChangeDatePicker=(value)=>{
     console.log('value', moment(value).format('DD/MM/YYYY'));
     let ngayKhoiChieu =moment(value).format('DD/MM/YYYY');
     formik.setFieldValue(ngayKhoiChieu);
  }

  const handleChangeSwitch=(name)=>{
    return (value) =>  { 
      formik.setFieldValue(name,value) }
  }

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  
  const handleChangeFile =(e) => {
      //Lấy file từ e
      let file = e.target.files[0];
      if (
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/gif" ||
        file.type === "image/png"
      ) {
      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload=(e)=>{
          setImgSrc(e.target.result);//Hình base 64
      }
      formik.setFieldValue("hinhAnh", file);
    }
  };


  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
    <Form
      onSubmitCapture = {formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <h3 className='text-center'>Thêm phim mới</h3>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên phim">
        <Input name="tenPhim" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name="trailer" onChange={formik.handleChange}/>
      </Form.Item>
      <Form.Item label="Mô tả">
        <Input name="moTa" onChange={formik.handleChange}/>
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker name="ngayKhoiChieu" format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
      </Form.Item>


      <Form.Item label="Đang chiếu" valuePropName="checked">
        {/* <Switch onChange={(value)=>{ formik.setFieldValue('dangChieu',value) }} /> */}
        <Switch  onChange={handleChangeSwitch('danhChieu')} />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch   onChange={handleChangeSwitch('sapChieu')}/>
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch   onChange={handleChangeSwitch('hot')}/>
      </Form.Item>


      <Form.Item label="Số sao">
        <InputNumber  onChange={handleChangeInputNumber("danhGia")} min={1} max={10} />
      </Form.Item>

      <Form.Item label="Hình ảnh">
        <input type={'file'} onChange={handleChangeFile} />
        <br/>
        <img style={{width:150,height:150}} src={imgSrc} alt="..." />
      </Form.Item>


      <Form.Item label="Tác vụ">
        <button type="onSubmit" className="bg-blue-300 text-white p-2">Thêm phim</button>
      </Form.Item>
    </Form>
    </>
  );
};

export default AddNew;