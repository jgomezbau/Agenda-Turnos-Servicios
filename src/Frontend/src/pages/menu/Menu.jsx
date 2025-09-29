import React, { useEffect } from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { getMenu } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from '@mui/material';

import "./Menu.css";

const Menu = () => {
  const menu = useSelector((state) => state.menus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem("currentUser");
    dispatch(getMenu({ usuario }));
  }, [dispatch]);

  const selectProduct = (e, nodeId) => {
    const item = menu.find((item) => item.id === nodeId);
    if (item.routeName) {
      navigate(`/${item.routeName}`);
    }
  };

  return (
    <Box className="container mx-auto">
      <Typography variant="h4" gutterBottom>MENU</Typography>
      <TreeView
        aria-label="menu tree"
        onNodeSelect={selectProduct}
      >
        {menu.map((item) => (
          <TreeItem nodeId={item.id} label={item.name} key={item.id} />
        ))}
      </TreeView>
    </Box>
  );
};
export default Menu;
