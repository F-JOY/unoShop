import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Box,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  InputBase,
  Grid,
  Link,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UnoV4 from "../images/UnoV4.png";
import { display, positions } from "@mui/system";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Login } from "../pages/loginForm";
import { Panier } from "../pages/panier";
import { Favorit } from "../pages/wishList";

import FormInscription from "../pages/FormInscription";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const pages = [
    { id: 1, name: "Accuiel" },
    { id: 2, name: "Categories" },
    { id: 3, name: "Produits" },
    { id: 4, name: "A propos" },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenue = Boolean(anchorEl);
  const handleClickMenue = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenue = () => {
    setAnchorEl(null);
  };

  const [openDrawer, setOpenDrawer] = useState(false);

  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [dialogW, setDialogW] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = (content, W) => {
    setDialogContent(content);
    setDialogW(W);
    handleOpen();
  };
  const [dataFromLogin, setDataFromLogin] = useState("");

  function handleDataFromLogin(data) {
    setDataFromLogin(data);
    if (data) {
      handleClose();
      setIsConnected(true);
    }
  }
  const [dataFromSign, setDataFromSign] = useState("");

  function handleDataFromSign(data) {
    setDataFromSign(data);
    if (data) {
      handleClose();
      setIsConnected(true);
    }
  }

  const [isConnected, setIsConnected] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsConnected(true);
      console.log(isConnected);
    } else {
      setIsConnected(false);
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsConnected(false);
    handleCloseMenue();
  };

  return (
    <AppBar
      sx={{
        background: "white",
        position: "absolute",
        zIndex: 1201,
      }}
    >
      <Toolbar>
        {isMatch == false ? (
          <>
            <Grid
              container
              spacing={4}
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              <Grid
                item
                xs={12}
                md={4}
                sm={6}
                display="flex"
                alignItems="flex-start"
              >
                <IconButton
                  sx={{ color: "black" }}
                  onClick={() => setOpenDrawer(!openDrawer)}
                >
                  <MenuIcon sx={{ fontSize: "40px" }} />
                </IconButton>
                <Drawer
                  variant="temporary"
                  anchor="top"
                  open={openDrawer}
                  onClose={() => setOpenDrawer(false)}
                >
                  {" "}
                  <Box height={80}></Box>
                  <Grid
                    item
                    display={"flex"}
                    justifyContent="center"
                    alignContent="center"
                    alignItems="center"
                    paddingBottom={"10px"}
                  >
                    {pages.map((page, index) => (
                      <Link
                        href="#"
                        variant="button"
                        underline="hover"
                        color={"gray"}
                        fontSize="15px"
                        sx={{
                          paddingLeft: 3,
                          paddingRight: 3,
                          ":hover": { color: "#F39200" },
                        }}
                      >
                        {page.name}
                      </Link>
                    ))}
                  </Grid>
                </Drawer>
                <img
                  src={UnoV4}
                  alt="Logo Image"
                  style={{ width: "65px", height: "40px", marginTop: 10 }}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={6} justifyContent="center">
                <Box
                  border={2}
                  borderColor="black"
                  height="35px"
                  display="flex"
                  paddingLeft="10px"
                  borderRadius="18px"
                  justifyContent={"center"}
                >
                  <InputBase
                    sx={{
                      width: "100%",
                    }}
                    color="secondary"
                    placeholder="Recherche..."
                  ></InputBase>
                  <IconButton>
                    <SearchIcon sx={{ borderLeft: "solid 1px" }} />
                  </IconButton>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sm={6}
                display="flex"
                justifyContent={"end"}
                alignItems="center"
              >
                <IconButton onClick={() => handleButtonClick(<Favorit />)}>
                  <FavoriteBorderOutlinedIcon
                    sx={{ color: "black", fontSize: "30px" }}
                  />
                </IconButton>
                <IconButton onClick={() => handleButtonClick(<Panier />)}>
                  <LocalMallOutlinedIcon
                    sx={{ color: "black", fontSize: "30px" }}
                  />
                </IconButton>
                {isConnected ? (
                  <>
                    <IconButton
                      id="basic-button"
                      aria-controls={openMenue ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenue ? "true" : undefined}
                      onClick={handleClickMenue}
                      //</> onClick={()=> handleLogOut()}
                    >
                      <AccountCircleIcon
                        sx={{ color: "black", fontSize: "30px" }}
                      />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openMenue}
                      onClose={handleCloseMenue}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem>Profile</MenuItem>
                      <MenuItem onClick={() => handleLogOut()}>
                        Se deconnecter
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "#69d2e7",
                        marginRight: 1,
                        ":hover": { backgroundColor: "#F39200" },
                      }}
                      onClick={() =>
                        handleButtonClick(
                          <FormInscription onData={handleDataFromSign} />,
                          true
                        )
                      }
                    >
                      inscription
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "#69d2e7",
                        ":hover": { backgroundColor: "#F39200" },
                      }}
                      onClick={() => {
                        handleButtonClick(
                          <Login onData={handleDataFromLogin} />,
                          false
                        );
                      }}
                    >
                      connexion
                    </Button>{" "}
                  </>
                )}
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <IconButton
              sx={{ color: "black" }}
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <MenuIcon sx={{ fontSize: "30px" }} />
            </IconButton>
            <Drawer
              anchor="top"
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
            >
              {" "}
              <Box height={50}></Box>
              <Grid display={"block"} justifyContent="center">
                <Grid
                  item
                  display={"flex"}
                  justifyContent="center"
                  alignContent="center"
                  alignItems="center"
                  marginTop="20px"
                >
                  {pages.map((page, index) => (
                    <Link
                      href="#"
                      variant="button"
                      underline="hover"
                      color={"gray"}
                      sx={{
                        height: 50,
                        paddingLeft: 1,
                        paddingRight: 1,
                        ":hover": { color: "#F39200" },
                      }}
                    >
                      {page.name}
                    </Link>
                  ))}
                </Grid>
                <Grid
                  item
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                  paddingBottom="10px"
                >
                  <Box
                    border={2}
                    borderColor="black"
                    height="30px"
                    display="flex"
                    paddingLeft="10px"
                    borderRadius="18px"
                    justifyContent={"center"}
                  >
                    <InputBase
                      sx={{
                        width: "100%",
                      }}
                      color="secondary"
                      placeholder="Recherche..."
                    ></InputBase>
                    <IconButton>
                      <SearchIcon sx={{ borderLeft: "solid 1px" }} />
                    </IconButton>
                  </Box>
                  <IconButton>
                    <FavoriteBorderOutlinedIcon
                      sx={{ color: "black", fontSize: "20px" }}
                    />
                  </IconButton>
                  <IconButton>
                    <LocalMallOutlinedIcon
                      sx={{ color: "black", fontSize: "20px" }}
                    />
                  </IconButton>

                  {isConnected ? (
                    <>
                    <IconButton
                      id="basic-button"
                      aria-controls={openMenue ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenue ? "true" : undefined}
                      onClick={handleClickMenue}
                      //</> onClick={()=> handleLogOut()}
                    >
                      <AccountCircleIcon
                        sx={{ color: "black", fontSize: "30px" }}
                      />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openMenue}
                      onClose={handleCloseMenue}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem>Profile</MenuItem>
                      <MenuItem onClick={() => handleLogOut()}>
                        Se deconnecter
                      </MenuItem>
                    </Menu>
                  </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        sx={{
                          height: "30px",
                          fontSize: "10px",
                          borderRadius: "15px",
                          backgroundColor: "#69d2e7",
                          marginRight: 1,
                          ":hover": { backgroundColor: "#F39200" },
                        }}
                        onClick={() =>
                          handleButtonClick(
                            <FormInscription onData={handleDataFromSign} />,
                            false
                          )
                        }
                      >
                        inscription
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          fontSize: "10px",
                          height: "30px",
                          borderRadius: "15px",
                          backgroundColor: "#69d2e7",
                          ":hover": { backgroundColor: "#F39200" },
                        }}
                        onClick={() => {
                          handleButtonClick(
                            <Login onData={handleDataFromLogin} />,
                            false
                          );
                        }}
                      >
                        connexion
                      </Button>
                    </>
                  )}
                </Grid>
              </Grid>
            </Drawer>
            <img
              src={UnoV4}
              alt="Logo Image"
              style={{
                width: "65px",
                height: "40px",
                marginTop: 10,
                marginLeft: "35%",
              }}
            />
          </>
        )}
        <Dialog open={open} onClose={handleClose} maxWidth="md">
          <DialogActions sx={{ height: "20px" }}>
            <IconButton>
              <CancelRoundedIcon onClick={handleClose} />
            </IconButton>
          </DialogActions>
          {dialogW == true ? (
            <DialogContent sx={{ width: "700px", height: "700px" }}>
              {dialogContent}
            </DialogContent>
          ) : (
            <DialogContent>{dialogContent}</DialogContent>
          )}
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
