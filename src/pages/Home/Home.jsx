import { Box, Container, Grid, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import Header from '../../components/common/Header.jsx';
import Footer from '../../components/common/Footer.jsx';

const Home = () => {
    const specialties = [
        { idUser: 1, title: "Tim Mạch", img: "" },
        { idUser: 2, title: "Nhi Khoa", img: "" },
        { idUser: 3, title: "Cơ Xương Khớp", img: "" },
        { idUser: 4, title: "Sản Phụ Khoa", img: "" }
    ];

    const doctors = [
        { name: "BS.", deparment: "Tim Mạch", img: "" },
        { name: "BS.", deparment: "Nhi Khoa", img: "" },
        { name: "BS.", deparment: "Xương Khớp", img: "" },
        { name: "BS.", deparment: "Phụ Khoa", img: "" },
    ]

    return (
        <>
            <Header />
            <Box
                sx={{
                    background: "linear-gradient(90deg, #0d47a1, #1976d2)",
                    color: "white",
                    py: 8,
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        Hệ thống Đặt lịch khám bệnh Hoàn Mỹ
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4 }}>
                        Chăm sóc sức khỏe toàn diện  -  Nhanh chóng - Chính xác
                    </Typography>
                    <Button variant="contained" size="large" color="warning">
                        Đặt lịch khám ngay
                    </Button>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Typography variant="h4" fontWeight="bold" mb={4}>
                    Chuyên khoa nổi bật
                </Typography>
                <Grid container spacing={3}>
                    {specialties.map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{ height: "100%", cursor: "pointer" }}>
                                <CardMedia component="img" height="160" image={item.img} />
                                <CardContent>
                                    <Typography variant="h6" align="center">
                                        {item.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Box sx={{ backgroundColor: "#f5f5f5", py: 6 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" fontWeight="bold" mb={4}>
                        Bác sĩ tiêu biểu
                    </Typography>
                    <Grid container spacing={3}>
                        {doctors.map((doc, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardMedia component="img" height="220" image={doc.img} />
                                    <CardContent>
                                        <Typography variant="h6">{doc.name}</Typography>
                                        <Typography color="text.secondary">
                                            {doc.deparment}
                                        </Typography>
                                        <Button sx={{ mt: 2 }} variant="outlined" fullWidth>
                                            Xem chi tiết
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Typography varient="h4" fontWeight="bold" mb={4}>
                    Quy trình khám bệnh
                </Typography>

                <Grid container spacing={3}>
                    {["Chọn Bác Sĩ", "Chọn Lịch Khám", "Xác Nhận", "Đi Khám"].map(
                        (step, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card sx={{ p: 3, textAlign: "center" }}>
                                    <Typography variant='h5' color='primary' fontWeight="bold">
                                        {index + 1}
                                    </Typography>
                                    <Typography>{step}</Typography>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default Home;
