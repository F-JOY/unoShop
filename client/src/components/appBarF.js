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
  Avatar,
  Badge,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
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

const Header = (props) => {
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const pages = [
    { id: 1, name: "Accuiel", route: "/" },
    { id: 2, name: "Categories & Produits", route: "/Produits" },
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
  const [dataFromLogin, setDataFromLogin] = useState("");
  const [dataFromSign, setDataFromSign] = useState("");
  const [userId, setUser] = useState("");
  const [type, setType] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isConnected, setIsConnected] = useState("");
  const [photo, setPhoto] = useState("");
  const [isFornisseur, setIsfournisseur] = useState(false);
  ////////////////////////fonction du dialogue////////////////////
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

  /////////////////recuperer les props de photo de profile de formulaire  de connexion///////////////
  function handleDataFromLogin(data) {
    setPhoto("http://localhost:3001/users/" + data);
    handleClose();
    setIsConnected(true);
  }
  /////////////////recuperer les props de photo de profile de formulaire  d'inscription///////////////

  function handleDataFromSign(data) {
    setPhoto("http://localhost:3001/users/" + data);
    handleClose();
    setIsConnected(true);
  }
  ////////////////////////props id user et type user from login ////////////////
  const handleUserid = (id) => {
    setUser(id);
    localStorage.setItem("id", id);
  };

  function handleUserType(userType) {
    setType(userType[0]);
  }

  //////////////////////////////les operations a effectuer lors de chargement de component ///////////////////////
  useEffect(() => {
    if (localStorage.getItem("photo")) {
      setPhoto("http://localhost:3001/users/" + localStorage.getItem("photo"));
    }

    if (localStorage.getItem("token")) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
      localStorage.removeItem("photo");
    }
    const array = localStorage.getItem("type");
    setCartItems(props.cartData);
  }, [props.cartData]);

  const updateCart = (newCartData) => {
    setCartItems(newCartData);
    props.updatedPanierProduct(newCartData);
  };
  ////////////////////////// deconnexion///////////////////////////////////
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("photo");
    localStorage.removeItem("type");
    localStorage.removeItem("typeCompt");
    localStorage.removeItem("userId");
    setIsConnected(false);
    handleCloseMenue();
    setType("");
    history.push('/');
  };

  return (
    <AppBar
      sx={{
        background: "white",
        position: "fixed",
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
                md={1}
                sm={3}
                display="flex"
                alignItems="flex-start"
              >
                <img
                  src={UnoV4}
                  alt="Logo Image"
                  style={{ width: "65px", height: "40px", marginTop: 10 }}
                />
              </Grid>
              <Grid item xs={12} md={8} sm={3} display={"flex"}>
                {pages.map((page, index) => (
                  <Link
                    href="#"
                    variant="button"
                    underline="hover"
                    color={"gray"}
                    fontSize="14px"
                    sx={{
                      paddingLeft: 3,
                      paddingRight: 3,
                      paddingTop: 1,
                      ":hover": { color: "#F39200" },
                    }}
                    onClick={() => history.push(page.route)}
                  >
                    {page.name}
                  </Link>
                ))}
                <Box
                  border={"solid 1px"}
                  borderColor="black"
                  height="35px"
                  width={"300px"}
                  display="flex"
                  paddingLeft="10px"
                  borderRadius="18px"
                  marginRight={10}
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
                md={3}
                sm={3}
                display="flex"
                justifyContent={"end"}
                alignItems="center"
              >
                {type === "Client" ||
                localStorage.getItem("type") === "Client" ? (
                  <>
                    <IconButton onClick={() => {history.push("/ProfilClient");}}>
                      <FavoriteBorderOutlinedIcon
                        sx={{ color: "black", fontSize: "30px" }}
                      />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleButtonClick(
                          <Panier
                            cartData={cartItems}
                            updateCart={updateCart}
                          />,
                          true
                        );
                      }}
                      sx={{ marginRight: "7px" }}
                    >
                      <Badge badgeContent={cartItems.length} color="primary">
                        <ShoppingCartOutlinedIcon
                          sx={{ color: "black", fontSize: "30px" }}
                        />
                      </Badge>
                    </IconButton>
                  </>
                ) : (type === "Fournisseurs" ||
                localStorage.getItem("type") === "Fournisseurs"?(
                  <Typography variant="h6" color={"gray"}>
                      {localStorage.getItem("type")}
                  </Typography>
                ):(type === "Admin" ||
                localStorage.getItem("type") === "Admin"?(
                 <Typography variant="h6" color={"gray"}>
                 {localStorage.getItem("type")}
                </Typography>
                ):(
                    <></>
                )
                 
                )
                  
                )}

                {isConnected ? (
                  <>
                    {" "}
                    <IconButton
                      id="basic-button"
                      aria-controls={openMenue ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenue ? "true" : undefined}
                      onClick={handleClickMenue}
                      //</> onClick={()=> handleLogOut()}
                    >
                      <Avatar src={photo}></Avatar>
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
                      <MenuItem
                        onClick={() => {
                          console.log(localStorage.getItem("type"));
                          localStorage.setItem(
                            "typeCompt",
                            localStorage.getItem("type")
                          );
                          type === "Fournisseurs" ||
                          localStorage.getItem("typeCompt") === "Fournisseurs"
                            ? history.push("/ProfilFournis")
                            : type === "Client" ||
                              localStorage.getItem("typeCompt") === "Client"
                            ? history.push("/ProfilClient")
                            : type === "Admin" ||
                              localStorage.getItem("typeCompt") === "Admin"
                            ? history.push("/ProfilAdmin")
                            : history.push("/ProfilClient");
                        }}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem onClick={() => handleLogOut()}>
                        Se deconnecter
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      sx={{
                        borderRadius: "15px",
                        borderColor: "#0049f2",
                        color: "#0049f2",
                        marginRight: 1,
                        ":hover": { color: "#F39200", borderColor: "#F39200" },
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
                        backgroundColor: "#0049f2",
                        ":hover": { backgroundColor: "#F39200" },
                      }}
                      onClick={() => {
                        handleButtonClick(
                          <Login
                            onData={handleDataFromLogin}
                            userId={handleUserid}
                            userType={handleUserType}
                          />,
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
                      onClick={() => history.push(page.route)}
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
                  <IconButton
                  
                  >
                    <FavoriteBorderOutlinedIcon
                      sx={{ color: "black", fontSize: "20px" }}
                    />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      handleButtonClick(
                        <Panier cartData={cartItems} updateCart={updateCart} />,
                        true
                      );
                    }}
                  >
                    <Badge
                      badgeContent={cartItems.length}
                      style={{ backgroundColor: "#F39200" }}
                    >
                      <ShoppingCartOutlinedIcon
                        sx={{ color: "black", fontSize: "30px" }}
                      />
                    </Badge>
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
                        variant="outlined"
                        sx={{
                          height: "30px",
                          fontSize: "10px",
                          borderRadius: "15px",
                          backgroundColor: "#0049f2",
                          color: "#0049f2",
                          marginRight: 1,
                          marginLeft: 2,
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
                          backgroundColor: "#0049f2",
                          ":hover": { backgroundColor: "#F39200" },
                        }}
                        onClick={() => {
                          handleButtonClick(
                            <Login
                              onData={handleDataFromLogin}
                              userId={handleUserid}
                              userType={handleUserType}
                            />,
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
