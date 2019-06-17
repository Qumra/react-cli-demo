import React, { Component } from "react";
import { Button, Modal, Form, Input, Table  } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

const CollectionCreateForm = Form.create()(
    class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form,data } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            centered
            title="横幅"
            okText="确定"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <FormItem label="Title">
                {getFieldDecorator('title', {
                  initialValue: data.content,
                  rules: [{ required: true, message: 'Please input the title of collection!' }],
                })(
                    <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                )}
              </FormItem>
            </Form>
          </Modal>
        );
      }
    }
  );
 
let selectedData = [];
  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     selectedData.length=0
  //     selectedData.push(...selectedRowKeys);
  //     if(selectedData.length==1){
  //       this.setState({isDisable:false})
  //     }
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  //   getCheckboxProps: record => ({
  //     disabled: record.type === 'Disabled User', // Column configuration not to be checked
  //     type: record.type,
  //   }),
  // };
class Conference extends Component {
    constructor(props){
        super(props)
        this.columns = [{
            title: '类型',
            dataIndex: 'type',
            render: text => <a href="javascript:;">{text}</a>,
          }, {
            title: '内容',
            dataIndex: 'content',
          }];
        this.state = {
            visible: false,
            collectionData:{},
            dataSource : [{
                key: '0',
                type: '横幅',
                content: 32,
              }, {
                key: '1',
                type: '横幅',
                content: 42,
              }, ],
            count:2,
            isDisable:true,
            delDisable:true
          };
    }
    
    
      showModal = () => {
        // const newData = [...this.state.dataSource];
        // const index = newData.findIndex(item => key === item.key);
        // console.log(index)
        // if(index>-1){
        //   this.setState({ collectionData: newData[index], visible: true });
        // }else{
        //   this.setState({ collectionData:{},visible: true });
        // }
        this.setState({ collectionData:{},visible: true });
      }
      croShowModal=(key)=>{
         const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => key === item.key);
        this.setState({ collectionData: newData[index], visible: true });
      }
    
      handleCancel = () => {
        this.setState({ visible: false });
      }
    
      handleCreate = (key=-1) => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
          console.log('Received values of form: ', values);
          const newData = [...this.state.dataSource];
          const index = newData.findIndex(item => key === item.key);
          console.log(index)
          if(index>-1){
            let item = newData[index];
            newData.splice(index, 1, {
             key:item.key,
             type:item.type,
             content:values.title
            });
            this.setState({ dataSource: newData });
          }else {
            this.handleAdd(values.title)}
          form.resetFields();
          
          this.setState({ visible: false });
         
        });
      }
    
      saveFormRef = (formRef) => {
        this.formRef = formRef;
      }
      handleDelete = (keys) => {
        let dataSource = [...this.state.dataSource];
        console.log(keys)
        keys.forEach(key=>{
           dataSource= dataSource.filter(item=>item.key !==key)
        })
        this.setState({ dataSource: dataSource });
      }
      handleAdd = (params) => {
        const { count, dataSource } = this.state;
        const newData = {
          key: count,
          type: `横幅`,
          content: params,
        };
        this.setState({
          dataSource: [...dataSource, newData],
          count: count + 1,
        });
      }
      handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ dataSource: newData });
      }
    render(){
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          selectedData.length=0
          selectedData.push(...selectedRowKeys);
          if(selectedData.length==1){
            this.setState({isDisable:false})
          }else{
            this.setState({isDisable:true})
          }
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.type === 'Disabled User', // Column configuration not to be checked
          type: record.type,
        }),
      };
        return <div>
          <Button onClick={() => {
            this.showModal()
          }}>新增</Button>
          <Button disabled={this.state.isDisable} onClick={() => {
             if(selectedData.length==1){
              this.croShowModal(selectedData[0])
          }else{
          //  this.setState({isDisable:true})
        }
          }}>修改</Button>
          <Button disabled={this.state.delDisable} onClick={()=>{
            if(selectedData.length>0){
              this.handleDelete(selectedData )
            }else{
              console.log("请选择要删除的项")
            }
          }}>删除</Button>
          <Table rowSelection={rowSelection} columns={this.columns} dataSource={this.state.dataSource} />,
      <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          data={this.state.collectionData}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={()=>{
            if(selectedData.length==0){
                  this.handleCreate()
              }else if(selectedData.length==1){
                this.handleCreate(selectedData[0])
              }
          }}
      />
        </div> 
    }
}
export default Conference
