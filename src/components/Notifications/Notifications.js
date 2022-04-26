import React from 'react';
import './Notifications.css'
import { makeStyles } from "@material-ui/styles";

import { IconButton } from '@mui/material';
// import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
const useStyles = makeStyles(theme => ({
    customButtonNotifications: {
        color: '#fff',
        "&:hover, &.Mui-focusVisible": { backgroundColor: "" },
        margin: '0 2px',
        padding: "5px",
        alignItems: "center",
    }
}));
export default function Notifications() {
    const classes = useStyles();

    return (
        <>
            <IconButton
                tooltip="Notificaciones"
                flow="down"
                classes={{
                    root: classes.customButtonNotifications
                }}
            >
                <OutdoorGrillIcon size={5} />
            </IconButton>
        </>
    );
}
