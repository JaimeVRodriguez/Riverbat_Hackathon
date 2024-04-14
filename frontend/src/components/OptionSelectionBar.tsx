import {Chip, Stack} from "@mui/material";
import React from "react";

type OptionSelectionBarProps = {
    options: string[];
    handleOnClick: (option: string) => void;
}

const OptionSelectionBar = React.FC<OptionSelectionBarProps> = (props: OptionSelectionBarProps) => {

    return <>
        <Stack direction="row" justifyContent="center">
            {
                props.options.map((option,index) => {
                    return <Chip label={option} key={index} color={'warning'} onClick={props.handleOnClick.bind(this, option)}/>
                })
            }
        </Stack>
    </>
};


export default OptionSelectionBar;