import { Button, Container, Typography, useTheme } from "@mui/material"
import { useEffect } from "react"
import { useWeb3 } from "./Web3ModalProvider"



const Navbar = () => {

    const theme = useTheme()

    const { connect, connected, accounts, web3, disconnect } = useWeb3()


    useEffect(() => {
        (async () => {
            if (web3 && accounts) {
                console.log(await web3.eth.getBalance(accounts[0]))
            }
        })()
        return () => {
        }
    }, [web3, accounts])


    return (
        <Container
            component={"nav"}
            sx={{
                display: "flex",
                flexDirection: {
                    xs: "column",
                    md: "row"
                },
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: theme.spacing(4),
                marginBottom: theme.spacing(4)
            }}
        >

            <Typography variant="h1" sx={{ fontSize: "30px" }}>Test</Typography>
            {
                connected === false
                    ? <Button
                        variant="outlined"
                        onClick={connect}
                        sx={{
                            fontSize: {
                                xs: "11px",
                                md: "14px"
                            }
                        }}
                    >
                        Connect With Metamask
                    </Button>
                    : <Button
                        variant="contained"
                        onClick={disconnect}
                        sx={{
                            fontSize: {
                                xs: "11px",
                                md: "14px"
                            }
                        }}
                    >
                        {accounts[0]}
                    </Button>

            }

        </Container >
    )

}


export default Navbar