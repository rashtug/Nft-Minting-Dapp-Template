import { RemoveCircle, AddCircle } from "@mui/icons-material"
import { Container, Box, useTheme, Typography, Paper, Button, IconButton, Divider } from "@mui/material"
import { useState } from "react"



const MintPage = () => {
    const theme = useTheme()

    const [mintAmount, setMintAmount] = useState(0)


    const [mintPrice, setMintPrice] = useState(2)

    return (
        <Container
            component="main"
            sx={{
                display: "flex",
                alignItems: "center",
                minHeight: {
                    xs: "60vh",
                    md: "80vh"
                }

            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        md: "row",
                    },
                    justifyContent: "space-between",
                }}
            >

                <Box
                    component={Paper}
                    elevation={5}
                    sx={{
                        width: {
                            xs: "100%",
                            md: "50%"
                        },
                        borderRadius: "10px",
                        overflow: "hidden",
                        height: "100%",
                        display: "flex"
                    }}
                >
                    <img alt="" src="/assets/placeholder.png" style={{ height: "auto", width: "100%", }} />
                </Box>
                <Box
                    sx={{
                        width: {
                            xs: "100%",
                            md: "40%"
                        },
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: "300", margin: 0 }}>Amount</Typography>
                    <Box sx={{
                        padding: 0,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: {
                            xs: "100%",
                            md: "50%"
                        }
                    }}>
                        <IconButton
                            sx={{ marginRight: theme.spacing(2), padding: 0 }}
                            onClick={() => {
                                if (mintAmount > 1) {
                                    setMintAmount(mintAmount - 1)
                                }
                            }}
                        >
                            <RemoveCircle sx={{ fontSize: "50px", color: "black" }} />
                        </IconButton>
                        <Button
                            disabled
                        >
                            <Typography color="primary" fontSize="50px">{mintAmount}</Typography>
                        </Button>
                        <IconButton
                            sx={{ marginLeft: theme.spacing(2), padding: 0 }}
                            onClick={() => {
                                if (mintAmount < 10) {
                                    setMintAmount(mintAmount + 1)
                                }
                            }}
                        ><AddCircle sx={{ fontSize: "50px", color: "black" }} /> </IconButton>
                    </Box>
                    <Divider sx={{ marginBottom: theme.spacing(3) }} />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button variant="outlined" sx={{ width: "50%", padding: theme.spacing(2) }} >Mint</Button>
                        <Typography>Total:  {Number(mintAmount * mintPrice).toFixed(2)} Ξ </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    )

}


export default MintPage