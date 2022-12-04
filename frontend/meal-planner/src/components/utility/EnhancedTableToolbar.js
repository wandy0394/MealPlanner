import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from "@mui/icons-material/FilterList";
import { alpha } from '@mui/material/styles';
import { strawTheme } from "./StrawTheme";

export default function EnhancedTableToolbar({ title='Title', numSelected, createDeleteHandler }) {

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          background:strawTheme.palette.primary.main,
          borderTopRightRadius: strawTheme.shape.borderRadius,
          borderTopLeftRadius: strawTheme.shape.borderRadius
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={createDeleteHandler}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };