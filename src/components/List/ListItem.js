import React from 'react'
import { GoRepo } from 'react-icons/go';
import { BsCodeSlash } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { IoGitBranchSharp } from 'react-icons/io5';
import { MdOutlineFavorite } from 'react-icons/md';
import  './ListItem.scss';

const ListItem = ({item = {}, isFavourite, onFavClick}) => {
    const {name, description, language, forks, stargazers_count} = item;
    return (
        <div className='repo-list-item' >
          <div className="group1">
            <div className="item-repo-header">
                <div>
                <GoRepo className="item-repo-icon"/>
                </div>
                <span>{name}</span>
            </div>  
            <div className="item-repo-description">
                <span>{description}</span>
            </div> 
         </div> 
          <div className="group2">
            <div className="item-repo-details">
            <TextWithIcon text={language} icon = {<BsCodeSlash className="item-repo-icon"/>}/> 
            <TextWithIcon text={stargazers_count} icon = {<AiFillStar className="item-repo-icon"/>}/> 
            <TextWithIcon text={forks} icon = {<IoGitBranchSharp className="item-repo-icon"/>}/> 
            </div>
            <div className={isFavourite ? "favbtn fav" : 'favbtn'} onClick = {() => onFavClick(item, isFavourite)}>
            <MdOutlineFavorite className='favBtnIcon'/>
            </div>  
          </div>
          
        </div>
    )
}

const TextWithIcon = ({text, icon}) => {
    return <div className="textWithIcon">
        {icon}
        <span className="textWithIcon__text">
            {text}
        </span>
    </div>
}

export default ListItem

