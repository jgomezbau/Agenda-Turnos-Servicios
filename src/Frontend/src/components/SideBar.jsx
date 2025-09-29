import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMenu } from "../actions";
import App from '../App';
import TreeView from 'devextreme-react/tree-view';
import "../styles/Menu.css"
import SvgComponentMenu from "./icons/menu";
import SvgComponentFlecha from "./icons/flecha";
const SideBar = ({ children }) => {
  const [open, setOpen] = useState(false);
  const menu = useSelector((state) => state.menus);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    
    const usuario = localStorage.getItem("currentUser");
    dispatch(getMenu({ usuario }))
  }, [dispatch])
  const select = (e) => {
    
    if (e.itemData.routeName !== "") {
        localStorage.setItem("get", e.itemData.get)
        localStorage.setItem("create", e.itemData.create)
        localStorage.setItem("edit", e.itemData.edit)
        localStorage.setItem("delete", e.itemData.delete)
        localStorage.setItem("reducer", e.itemData.reducer)
        localStorage.setItem("nombrePagina", e.itemData.text)
        setOpen(!open)
        navigate(`/${e.itemData.routeName}`)
    }
  }

  return (
    <div className="flex">
      <div
        className={` ${open ? "w-72" : "w-20 "
          } bg-menucolor h-screen p-5  pt-8 relative duration-300 `}
      >
        <SvgComponentFlecha width={42} className={`absolute cursor-pointer -right-3 top-9 w-7 
           border border-black rounded-full bg-menucolor ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)} ></SvgComponentFlecha>

        <div className="flex gap-x-4 items-center ">
          <SvgComponentMenu width={52} height={52} className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
            }`} ></SvgComponentMenu>
        </div>

        {open && <div className='container mx-auto '>
          <div className={`bg-menucolor`}>
            <TreeView
              id="treeview"
              items={menu}
              width={500}
              selectByClick={true}
              onItemSelectionChanged={select}
            />
          </div>
        </div>}
      </div>
      <div className="h-screen flex-1 p-7">
        <App />
      </div>
    </div>
  );
};
export default SideBar;
