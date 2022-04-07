//import React from "react";
import singleLogo from '../../../icons/single.svg'
import multiLogo from '../../../icons/multi.svg'
import allLogo from '../../../icons/all.svg'

const SeletionToolbar = ({selectionMode, setSelectionMode, selected, setSelected, data}) =>{

    const changeMode = (mode) => {
        switch (mode){
            case 'single':
                setSelectionMode('single')
                setSelected([])
                break;
            case 'multi':
                setSelectionMode('multi')
                break;
            case 'all':
                console.log('all')

                if(selected.length === data.length){
                    setSelected([])
                }else{
                    let newArr = []
                    for(let file of data){
                        newArr.push(file.uid)
                    }
                    setSelected(newArr)
                }

                break;
        }

        

    }


    return(
        <div className="toolbar">
            <div className={selectionMode==='single'?'underline':''} onClick = {()=>changeMode('single')}><img src={singleLogo}/></div>    
            <div className={selectionMode==='multi'?'underline':''} onClick = {()=>changeMode('multi')}><img src={multiLogo}/></div>    
            <div className="" onClick = {()=>changeMode('all')}><img src={allLogo}/></div>    
        </div>
    )
}

export default SeletionToolbar