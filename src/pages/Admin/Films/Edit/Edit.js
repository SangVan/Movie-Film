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
  import React, { useEffect, useState } from 'react';
  import { useFormik } from 'formik';
  import moment from 'moment';
  import { GROUPID } from '../../../../util/settings/config';
  import { useDispatch, useSelector } from 'react-redux';
  import { capNhatPhimAction, layThongTinPhimAction, themMoiPhimAction } from '../../../../redux/actions/QuanLyPhimActions';
  
  
  const Edit = (props) => {
    const [componentSize, setComponentSize] = useState('default');
    const {thongTinPhim} = useSelector(state=>state.QuanLyPhimReducer);
    console.log('thongTin',thongTinPhim);
    const [imgSrc, setImgSrc] = useState("");
  
    const dispatch = useDispatch();

    useEffect(()=>{
        let { id } = props.match.params;
        dispatch(layThongTinPhimAction(id));
    },[])

    const formik =useFormik({
      enableReinitialize:true,
      initialValues:{
        maPhim: thongTinPhim.maPhim,
        dangChieu: thongTinPhim.dangChieu,
        sapChieu: thongTinPhim.sapChieu,
        hot: thongTinPhim.hot,
        danhGia: thongTinPhim.danhGia,
        tenPhim: thongTinPhim.tenPhim,
        trailer: thongTinPhim.trailer,
        moTa: thongTinPhim.moTa,
        maNhom: GROUPID,
        ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
        hinhAnh: null,
          
      },
      onSubmit:(values)=>{
        values.maNhom = GROUPID;
        let formData = new FormData();
        for (let key in values) {
          if (key !== "hinhAnh") {
            formData.append(key, values[key]);
          } else {
            if (values.hinhAnh !== null) {
                formData.append("File", values.hinhAnh, values.hinhAnh.name);
            }
          }
        }
        dispatch(capNhatPhimAction(formData));
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
        <h1 className='text-center'>Cập nhật thông tin phim</h1>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer}/>
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name="moTa" onChange={formik.handleChange} value={formik.values.moTa}/>
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker name="ngayKhoiChieu" format={"DD/MM/YYYY"} onChange={handleChangeDatePicker}  value={moment(formik.values.ngayKhoiChieu)} />
        </Form.Item>
  
  
        <Form.Item label="Đang chiếu" valuePropName="checked">
          {/* <Switch onChange={(value)=>{ formik.setFieldValue('dangChieu',value) }} /> */}
          <Switch  onChange={handleChangeSwitch('danhChieu')} checked={formik.values.dangChieu}/>
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch   onChange={handleChangeSwitch('sapChieu')}  checked={formik.values.sapChieu}/>
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch   onChange={handleChangeSwitch('hot')} checked={formik.values.hot}/>
        </Form.Item>
  
  
        <Form.Item label="Số sao">
          <InputNumber  onChange={handleChangeInputNumber("danhGia")} min={1} max={10} value={formik.values.danhGia} />
        </Form.Item>
  
        <Form.Item label="Hình ảnh">
          <input type={'file'} onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
          <br/>
          <img style={{width:150,height:150}} src={imgSrc ===""?thongTinPhim.hinhAnh:imgSrc} alt="..." />
        </Form.Item>
  
  
        <Form.Item label="Tác vụ">
          <button type="onSubmit" className="bg-blue-300 text-white p-2">Cập nhật</button>
        </Form.Item>
      </Form>
      </>
    );
  };
  
  export default Edit;