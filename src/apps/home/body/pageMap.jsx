import React from "react";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const mirrorData = {
  id: "ligth_regulonDB",
  xs: 3,
  section: "tool",
  title: "RegulonDB mirror sites ",
  description: `Our RegulonDB mirror sites in the cities of Cuernavaca Morelos and Querétaro. Additionally, you have the option to download and install a local instance of RegulonDB application on your computer.`,
  links: [
    {
      url: "https://regulondb.liigh.unam.mx",
      label: "RegulonDB LIIGH UNAM",
    },
    {
      url: "https://testregulondb.ccg.unam.mx/",
      label: "RegulonDB CCG UNAM",
    },
    {
      url: "/manual/apiSoftware/docker",
      label: "RegulonDB Docker (local instance)",
    },
  ],
};

export default function PageMap() {
  return (
    <Item>
      <div style={{ display: "flex", alignItems: "center" }}>
        <AccountTreeIcon />
        <p>
          <b>{mirrorData.title}</b>
        </p>
      </div>
      <div style={{ marginLeft: "10px" }}>
        <p>{mirrorData.description} </p>
        {mirrorData.links.map((link, index) => {
          return (
            <Link key={"link_"+index} to={link.url}>
              <Typography color="secondary">{link.label}</Typography>
            </Link>
          );
        })}
      </div>
    </Item>
  );
}
