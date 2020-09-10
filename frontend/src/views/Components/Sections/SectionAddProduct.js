import React from "react";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import {
    Form,
    Alert,
    Upload,
    Button as AntButton,
    message
} from 'antd';
import { UploadOutlined, StarOutlined } from '@ant-design/icons';
import ProductService from "../../../service/ProductService";
import styleModule from "./style.module.css";


export default function SectionAddProducts() {
    const [fileList, updateFileList] = React.useState([]);

    const addProduct = (values) => {
        const form = new FormData();
        console.log(values.product);
        form.append("file", values.product.image.file);
        form.append("name", values.product.name);
        form.append("code", values.product.code);
        form.append("description", values.product.desc);
        form.append("price", values.product.price);
        ProductService.addProduct(form);
    }

    const props = {
        fileList,
        action: "",
        beforeUpload: file => {
            return false;
        },
        onChange: info => {
            console.log(info.fileList);
            // file.status is empty when beforeUpload return false
            updateFileList(info.fileList.filter(file => !!file.status));
            message.success(`${info.file.name} file uploaded successfully`);
        },
        showUploadList: {
            showDownloadIcon: true,
            downloadIcon: 'download ',
            showRemoveIcon: true,
            removeIcon: <StarOutlined onClick={e => console.log(e, 'custom removeIcon event')} />,
        },
    };

    return (
        <GridContainer style={{ justifyContent: "center" }}>
            <GridItem md={8}>
                <Form
                    layout="vertical"
                    name="profile"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={addProduct}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={styleModule.cardTitleWhite}>Urun Ekle</h4>
                        </CardHeader>
                        <CardBody style={{ marginTop: "20px" }}>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Form.Item
                                        name={['product', 'code']}
                                        rules={[
                                            {
                                                required: true,
                                                message: (<Alert style={{ marginTop: "10px" }} message="Urun kodu giriniz" type="error" />)
                                            }
                                        ]}
                                    >
                                        <TextField
                                            label="Urun Kodu"
                                            fullWidth
                                        />
                                    </Form.Item>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <Form.Item
                                        name={['product', 'name']}
                                        rules={[
                                            {
                                                required: true,
                                                message: (<Alert style={{ marginTop: "10px" }} message="Urun ismi giriniz" type="error" />)
                                            }
                                        ]}
                                    >
                                        <TextField
                                            label="Urun Ismi"
                                            fullWidth
                                        />
                                    </Form.Item>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <Form.Item
                                        name={['product', 'price']}
                                        rules={[
                                            {
                                                required: true,
                                                message: (<Alert style={{ marginTop: "10px" }} message="Fiyat giriniz" type="error" />)
                                            },
                                            {
                                                pattern: /^[0-9]+$/,
                                                message: (<Alert style={{ marginTop: "10px" }} message="Lutfen sayi giriniz" type="error" />)
                                            }
                                        ]}
                                    >
                                        <TextField
                                            label="Urunun Fiyati"
                                            fullWidth
                                        />
                                    </Form.Item>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Form.Item
                                        name={['product', 'desc']}
                                        rules={[
                                            {
                                                required: true,
                                                message: (<Alert style={{ marginTop: "10px" }} message="Aciklama giriniz" type="error" />)
                                            }
                                        ]}
                                    >
                                        <TextField
                                            label="Urun Aciklamasi"
                                            id="desc"
                                            multiline
                                            rows={5}
                                            fullWidth
                                        />
                                    </Form.Item>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Form.Item
                                        name={['product', 'image']}
                                    >
                                        <Upload
                                            {...props}
                                            listType="picture"
                                        >
                                            <AntButton size="large" icon={<UploadOutlined />}>Urun Resmi Ekle</AntButton>
                                        </Upload>
                                    </Form.Item>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter style={{ justifyContent: "center" }}>
                            <Button type="submit" color="github" round>Ekle</Button>
                        </CardFooter>
                    </Card>
                </Form>
            </GridItem>
        </GridContainer >
    );
}