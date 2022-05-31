import React, { useCallback, useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import axios from "axios";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import "./userOrders.css";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const UserOrders = () => {
  const classes = useStyles();
  const userInfo = useSelector((state) => state.userInfo);
  const [data, setData] = useState([]);

  const getOrders = useCallback(async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/shoppingcart/History`,
        { email: userInfo.email }
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [userInfo.email]);


  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">ID</TableCell>
              <TableCell className="tableCell">Customer</TableCell>
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Status</TableCell>
              <TableCell className="tableCell">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">{row.email}</TableCell>
                <TableCell className="tableCell">{row.createdAt}</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.statusOpen}`}>
                    {row.statusOpen === false ? "Closed" : "Open"}
                  </span>
                </TableCell>
                <TableCell className="tableCell">
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<MoreHorizIcon />}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/detail/${row.id}`}
                    >
                      Details
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserOrders;
