import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { BsStar, BsStarFill } from 'react-icons/bs';
import Axios from '../Axios';

const FavoriteButton = ({ rid }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // 檢查使用者的收藏列表，確認是否已收藏此食譜
    Axios().get('recipe/member/collection/')
      .then((res) => {
        const collection = res.data;
        const isFavorite = collection.some((item) => parseInt(item.recipe_rid) === parseInt(rid));
        setIsFavorite(isFavorite);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [rid]);

  const handleFavoriteClick = (event) => {
    event.stopPropagation(); 

    if (isFavorite) {
      // 執行取消收藏操作
      Axios().delete('recipe/member/delete/', { params: { rid: rid.toString() } })
        .then(() => {
          setIsFavorite(false);
          alert('已取消收藏');
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 404) {
            alert("沒有該收藏紀錄");
          }
        });
    } else {
      // 執行新增收藏操作
      Axios().post('recipe/member/new/', JSON.stringify({ rid }))
        .then(() => {
          setIsFavorite(true);
          alert('成功收藏');
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 404) {
            alert("食譜沒找到呢");
          } else if (err.response && err.response.status === 400) {
            alert("已有相同收藏");
          }
        });
    }
  };

  return (
    <Button 
      variant="link" 
      onClick={handleFavoriteClick}
      style={{ color: isFavorite ? 'gold' : 'gray' }}
    >
      {isFavorite ? <BsStarFill size={24}/> : <BsStar size={24}/>}
    </Button>
  );
};

export default FavoriteButton;
