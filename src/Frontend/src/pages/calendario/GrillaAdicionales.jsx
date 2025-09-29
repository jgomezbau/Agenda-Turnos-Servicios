import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid, {
    Column,
    FormItem,
    Editing,
    Paging,
    RequiredRule,
} from 'devextreme-react/data-grid';
import { armarGrillaAdicionales, Adicionales, grabarAdicionales } from "../../actions/jardinDelPilar";

export const GrillaAdicionales = ({ turno, unidad, servicio }) => {
    const dispatch = useDispatch();
    const column = useSelector((state) => state.columnas);
    const adicionales = useSelector((state) => state.ADICIONALES);

    const grabar = (e) => {
        dispatch({
            type: "adicionalesOK",
            payload: true
        });
        dispatch(grabarAdicionales(e.changes));
    }

    const edicionCancelada = () => {
        dispatch({
            type: "adicionalesOK",
            payload: true
        });
    }

    const deshabilitar = () => {
        dispatch({
            type: "adicionalesOK",
            payload: false
        });
    }

    useEffect(() => {
        dispatch(armarGrillaAdicionales());
        dispatch(Adicionales(turno, unidad, servicio));
    }, [dispatch, turno, unidad, servicio]);

    return (
        <div>
            <DataGrid
                dataSource={adicionales}
                keyExpr="id"
                showBorders={true}
                onSaving={grabar}
                onEditCanceled={edicionCancelada}
                onEditingStart={deshabilitar}
            >
                <Paging enabled={false} />
                <Editing
                    mode="batch"
                    allowUpdating={true}
                    allowAdding={false}
                    allowDeleting={false} 
                />
                {
                    column.map((atributo, index) => (
                        <Column
                            key={index}  // Agrega un key único aquí usando el índice del array o algún identificador único de los datos
                            dataField={atributo.dataField}
                            visible={atributo.visible}
                            caption={atributo.caption}
                            allowEditing={atributo.allowEditing}
                        >
                            {atributo.required ? <RequiredRule /> : null}
                            <FormItem editorType={atributo.editorType}></FormItem>
                        </Column>
                    ))
                }
            </DataGrid>
        </div>
    );
}
