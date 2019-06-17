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
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      selectedData.length=0
      selectedData.push(...selectedRowKeys);
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.type === 'Disabled User', // Column configuration not to be checked
      type: record.type,
    }),
  };
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
          };
    }
    
    
      showModal = (key=-1) => {
        console.log(key);
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => key === item.key);
        console.log(index)
        if(index>-1){
          this.setState({ collectionData: newData[index], visible: true });
        }else{
          this.setState({ collectionData:{},visible: true });
        }
        
      }
    
      handleCancel = () => {
        this.setState({ visible: false });
      }
    
      handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
    
          console.log('Received values of form: ', values);
          form.resetFields();
          this.setState({ visible: false });
          this.handleAdd(values.title)
        });
      }
    
      saveFormRef = (formRef) => {
        this.formRef = formRef;
      }
      handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
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
        
        return <div>
          <Button onClick={() => {
          if(selectedData.length==0){
              this.showModal()
          }
          else if(selectedData.length==1){
              this.showModal(selectedData[0])
          }
          else{
              console.log('不能选中多个')
          }
          
          }}>新增/编辑</Button>
          <Button onClick={()=>{
            if(selectedData.length>0){
              selectedData.forEach(element=>{this.handleDelete(element)})
              
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
          onCreate={this.handleCreate}
      />
        </div> 
    }
}
export default Conference
