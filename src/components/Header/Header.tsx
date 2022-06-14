import { observer } from 'mobx-react-lite'
import React from 'react';
import useStore from "../../hooks/useStore";

function Header() {
    const { Users, Boards } = useStore();
  return (
    <div>Header</div>
  )
}

export default observer(Header);