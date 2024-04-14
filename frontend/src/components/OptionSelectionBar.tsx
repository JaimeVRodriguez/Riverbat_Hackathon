import {Chip, Stack} from "@mui/material";

type OptionSelectionBarProps = {
    options: string[];
    handleOnClick: (option: string) => void;
}

const OptionSelectionBar = (props: OptionSelectionBarProps) => {

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