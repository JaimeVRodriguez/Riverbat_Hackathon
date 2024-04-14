import {Chip, Stack} from "@mui/material";
import {styleColors} from "../globals/colors.ts";

type OptionSelectionBarProps = {
    options: string[];
    handleOnClick: (option: string) => void;
}

const OptionSelectionBar = (props: OptionSelectionBarProps) => {

    return <>
        <Stack direction="row" sx={{}} justifyContent="center">
            {
                props.options.map((option, index) => {
                    return <Chip label={option} key={index}
                                 sx={{
                                     fontSize: 'x-large',
                                     fontFamily: 'Roboto Mono',
                                     backgroundColor:styleColors.accent200,
                                     marginX:'2em',
                                     padding:'1em',
                                 }}
                                 onClick={props.handleOnClick.bind(this, option)}/>
                })
            }
        </Stack>
    </>
};


export default OptionSelectionBar;