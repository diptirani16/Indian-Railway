import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

export default function PaginationControlled() {
//   const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Typography>Page: {page}</Typography>
      <Pagination count={72} page={page} onChange={handleChange} color="primary" shape="rounded"/>
    </div>
  );
}