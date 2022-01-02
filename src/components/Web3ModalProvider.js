
import { Button, Modal, Paper, Typography, Box, useTheme } from "@mui/material";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { createContext, useContext, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";


const web3Context = createContext({
    web3: undefined,
    accounts: undefined,
    networkId: undefined,
    chainId: undefined,
    connected: false,
    connect: () => { },
    disconnect: () => { },
});


export const useWeb3 = () => {
    const web3 = useContext(web3Context);
    return web3
}

const Web3ModalProvider = ({ children }) => {


    const theme = useTheme()

    const [showDisconnectModal, setShowDisconnectModal] = useState(false)




    const onWeb3Connect = async () => {
        const provider = await web3Modal.connect()
        subscribeProvider(provider)
        const web3 = await initWeb3(provider)
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const chainId = await web3.eth.getChainId()

        const onWeb3DisConnect = async () => {
            setShowDisconnectModal(true)
        }


        setWeb3Provider(provider => ({
            ...provider,
            web3,
            accounts,
            networkId,
            chainId,
            disconnect: onWeb3DisConnect,
            connected: true,
        }))
    }


    const [web3Provider, setWeb3Provider] = useState({
        web3: undefined,
        accounts: undefined,
        networkId: undefined,
        chainId: undefined,
        connect: onWeb3Connect,
        disconnect: () => { },
        connected: false
    })

    const web3Modal = new Web3Modal({
        providerOptions: {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: process.env.REACT_APP_INFURA_ID,
                }
            },
        }
    });

    const subscribeProvider = async (provider) => {
        if (!provider.on) {
            return;
        }
        provider.on("close", () => {
            window.location.reload()
        })
        provider.on("accountsChanged", async (accounts, err) => {
            console.log(accounts)

            if (accounts.length === 0) {
                window.location.reload()
            } else {
                setWeb3Provider(provider => ({
                    ...provider,
                    accounts
                }))
            }

        });
        provider.on("chainChanged", async (chainId) => {
            console.log("chainId", chainId)
            setWeb3Provider(provider => ({
                ...provider,
                chainId
            }))
        });

        provider.on("networkChanged", async (networkId) => {
            console.log("networkId", networkId)
            setWeb3Provider(provider => ({
                ...provider,
                networkId
            }))
        });
    };

    const initWeb3 = async (provider) => {
        const web3 = new Web3(provider);
        return web3

    }




    return <web3Context.Provider value={web3Provider}>
        <Modal
            open={showDisconnectModal}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: theme.spacing(1),
            }}
        >
            <Box
                component={Paper}
                sx={{
                    padding: theme.spacing(1),
                }}
            >
                <Paper
                    sx={{
                        margin: theme.spacing(2),
                        padding: theme.spacing(2),
                    }}
                >
                    <Typography variant="body2" >{web3Provider?.accounts && web3Provider?.accounts[0]}</Typography>
                </Paper>
                <Box
                    sx={{
                        margin: theme.spacing(2),
                        padding: theme.spacing(2),
                    }}
                >
                    <Typography>Disconnect?</Typography>
                    <Button
                        sx={{ margin: theme.spacing(2) }}
                        variant="contained"
                        onClick={() => {
                            window.location.reload()
                        }}
                    >Yes</Button>
                    <Button
                        sx={{ margin: theme.spacing(2) }}
                        variant="outlined"
                        onClick={() => {
                            setShowDisconnectModal(false)
                        }}
                    >No</Button>
                </Box>
            </Box>
        </Modal>
        {children}
    </web3Context.Provider>

}

export default Web3ModalProvider