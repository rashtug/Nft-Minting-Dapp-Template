import { createTheme, ThemeProvider } from "@mui/material"
import { deepOrange } from "@mui/material/colors"




const CustomThemeProvider = ({ children }) => {


    const theme = createTheme({
        palette: {
            primary: {main: "#202020"}, 
            secondary: deepOrange,
        },
        components: {
            MuiButton: {
                defaultProps: {
                    style:{
                        borderRadius: "30px",
                    }
                }
            }
        }
    })


    return <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>


}

export default CustomThemeProvider