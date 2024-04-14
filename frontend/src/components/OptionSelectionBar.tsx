import {Chip, Stack} from "@mui/material";
import {styleColors} from "../globals/colors.ts";

type OptionSelectionBarProps = {
    options: string[];
    handleSelection: (option: string) => void;
}

const OptionSelectionBar = (props: OptionSelectionBarProps) => {
    const handleClickOption = (option: string) => {
        props.handleSelection.bind(this, option);
    }
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
                                 onClick={handleClickOption.bind(this, option)}/>
                })
            }
        </Stack>
    </>
};


export default OptionSelectionBar;