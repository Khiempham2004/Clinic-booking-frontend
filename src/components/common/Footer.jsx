import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Link,
    Button,
    Stack,
    IconButton,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";




const Footer = () => {

    return (
        <>
            <Box sx={{ backgroundColor: "#008c99", color: "#fff", pt: 6 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {/* LOGO + INFO */}
                        <Grid item xs={12} md={4}>
                            <Typography variant="h5" fontWeight="bold" mb={2}>
                                Hoan My
                            </Typography>

                            <Typography fontSize={14} mb={2}>
                                Phòng 1101, Lầu 11, Tòa nhà Friendship, 31 Lê Duẩn,
                                phường Sài Gòn, TP. Hồ Chí Minh
                            </Typography>

                            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                                <PhoneIcon fontSize="small" />
                                <Typography>(028) 3820 6001</Typography>
                            </Stack>

                            <Stack direction="row" spacing={1} alignItems="center">
                                <EmailIcon fontSize="small" />
                                <Typography>contactus@hoanmy.com</Typography>
                            </Stack>
                        </Grid>

                        {/* COLUMN 1 */}
                        <Grid item xs={12} md={2}>
                            <Typography fontWeight="bold" mb={2}>
                                Hoàn Mỹ
                            </Typography>
                            {[
                                "Về chúng tôi",
                                "Mạng lưới Hoàn Mỹ",
                                "Tuyển dụng",
                                "Bác sĩ",
                                "Cộng đồng",
                                "Hoàn Mỹ Academy",
                            ].map((text, i) => (
                                <Link key={i} href="#" underline="none" color="#fff" display="block" mb={1}>
                                    {text}
                                </Link>
                            ))}
                        </Grid>

                        {/* COLUMN 2 */}
                        <Grid item xs={12} md={2}>
                            <Typography fontWeight="bold" mb={2}>
                                Thông tin
                            </Typography>
                            {[
                                "Hội thảo & Hội nghị",
                                "Tin tức",
                                "Giải thưởng",
                                "Chính sách quà tặng",
                                "Chính sách bảo mật",
                                "Liên hệ",
                            ].map((text, i) => (
                                <Link key={i} href="#" underline="none" color="#fff" display="block" mb={1}>
                                    {text}
                                </Link>
                            ))}
                        </Grid>

                        {/* CTA + APP */}
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                #tantamchamsoc
                            </Typography>

                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#fff",
                                    color: "#008c99",
                                    borderRadius: 10,
                                    px: 3,
                                    mb: 2,
                                    "&:hover": { backgroundColor: "#e0f7fa" },
                                }}
                                endIcon={<ArrowForwardIcon />}
                            >
                                Đặt lịch hẹn
                            </Button>

                            <Typography fontSize={14} mb={2}>
                                Tải App Danh Y ngay hôm nay! Trải nghiệm tính năng đặt lịch,
                                quản lý hồ sơ và nhận các ưu đãi.
                            </Typography>

                            <Stack direction="row" spacing={2}>
                                <Button variant="outlined" color="inherit" sx={{ borderRadius: 6 }}>
                                    App Store
                                </Button>
                                <Button variant="outlined" color="inherit" sx={{ borderRadius: 6 }}>
                                    Play Store
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>

                    {/* BOTTOM */}
                    <Box
                        sx={{
                            borderTop: "1px solid rgba(255,255,255,0.3)",
                            mt: 4,
                            pt: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            alignItems: "center",
                        }}
                    >
                        <Typography fontSize={13}>
                            Chính sách bảo mật | Copyright © 2026 Hoan My Corporation
                        </Typography>

                        <Stack direction="row" spacing={1}>
                            <IconButton color="inherit">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton color="inherit">
                                <YouTubeIcon />
                            </IconButton>
                            <IconButton color="inherit">
                                <LinkedInIcon />
                            </IconButton>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default Footer;
