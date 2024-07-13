import React from 'react';
import './ShopNow.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom';

export default function ShopNow() {
  const navigate = useNavigate();

  const openFullScreen = (media) => {
    navigate('/fullscreen', { state: { media } });
  };

  return (
    <div className="shop-container">
      <Sidebar />
      <div className="main-content">
        <h1>Welcome to the Shop</h1>
        <p>Select a category from the sidebar to start shopping!</p>
        <div className='images'>
          {/* Replace each image-item with dynamic content */}
          {imageData.map((item, index) => (
            <div className="image-item" key={index}>
              <div className="item-container">
                <img src={item.imageUrl} alt={`Item ${index}`} />
                <div className="buy-button">
                  <button>Buy</button>
                  <br />
                  <button className='down' onClick={() => openFullScreen(item.imageUrl)}>Virtual Try</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Shop by Category</h2>
      <div className="category">
        <h3>Mens</h3>
        <ul>
          <li><a href="#mens-shoes">Shoes</a></li>
          <li><a href="#mens-shirts">Shirts</a></li>
          <li><a href="#mens-traditional">Traditional Wear</a></li>
          <li><a href="#mens-western">Western Wear</a></li>
          <li><a href="#mens-googles">Googles</a></li>
        </ul>
      </div>
      <div className="category">
        <h3>Womens</h3>
        <ul>
          <li><a href="#womens-saree">Saree</a></li>
          <li><a href="#womens-frocks">Frocks</a></li>
          <li><a href="#womens-footwears">Footwears</a></li>
          <li><a href="#womens-ornaments">Ornaments</a></li>
          <li><a href="#womens-makeup">Makeup Items</a></li>
        </ul>
      </div>
      <div className="category">
        <h3>Kids</h3>
        <ul>
          <li><a href="#kids-frocks">Frocks</a></li>
          <li><a href="#kids-footwear">Footwear</a></li>
          <li><a href="#kids-googles">Googles</a></li>
          <li><a href="#kids-skirts">Skirts</a></li>
          <li><a href="#kids-tops">Tops</a></li>
        </ul>
      </div>

      <div className="category">
        <h3>Jewellery</h3>
        {/* <ul>
          <li><a href="#kids-frocks">Frocks</a></li>
          <li><a href="#kids-footwear">Footwear</a></li>
          <li><a href="#kids-googles">Googles</a></li>
          <li><a href="#kids-skirts">Skirts</a></li>
          <li><a href="#kids-tops">Tops</a></li>
        </ul> */}
      </div>


      <div className="category">
        <h3>MakeUp</h3>
        {/* <ul>
          <li><a href="#kids-frocks">Frocks</a></li>
          <li><a href="#kids-footwear">Footwear</a></li>
          <li><a href="#kids-googles">Googles</a></li>
          <li><a href="#kids-skirts">Skirts</a></li>
          <li><a href="#kids-tops">Tops</a></li>
        </ul> */}
      </div>
    </div>
  );
}

const imageData = [
  { imageUrl: 'https://i.pinimg.com/236x/8d/9f/c3/8d9fc35da2ce934973854c1b4c49e2fd.jpg' },
  { imageUrl: 'https://i.pinimg.com/736x/8d/84/bc/8d84bc7abac818088d5c321ea9700d9c.jpg' },
  { imageUrl: 'https://i.pinimg.com/236x/fd/35/27/fd3527a97e92d2cf8c7f4dc8291c28cb.jpg' },
  { imageUrl: 'https://i.pinimg.com/236x/ee/76/10/ee7610562aab213e18fbe41eb7f2a984.jpg' },
  { imageUrl: 'https://i.pinimg.com/236x/78/ef/9d/78ef9d459126fa10c1091dbcbf89d249.jpg' },
  { imageUrl: 'https://i.pinimg.com/236x/75/1b/e4/751be4197179d551d3fb0e7bda7dcb4c.jpg' },
  { imageUrl: 'https://i.pinimg.com/236x/64/15/6d/64156d524517d944f3afba0ec3bd002e.jpg' },
  { imageUrl: 'https://i.pinimg.com/236x/e5/0b/a1/e50ba1b08ad0e85253b54172a39409a1.jpg' },
  { imageUrl: 'https://i.pinimg.com/236x/27/fb/68/27fb68a2a4d002ca2cb620bd2534913b.jpg' },
  { imageUrl: 'https://i.pinimg.com/236x/41/0f/b4/410fb4e6f30f4eef780ccae6ad913f2e.jpg' },
  { imageUrl: 'https://i.pinimg.com/236x/5e/dd/9e/5edd9e5927d38d4f618c41e5352d548b.jpg' },
  { imageUrl: 'https://i.pinimg.com/236x/bf/36/f0/bf36f074d95011dc6b67d134704d8ea6.jpg' },
  { imageUrl: 'https://i.pinimg.com/236x/60/d5/01/60d501e61bf616fe6e870cf2c35830fd.jpg' },
  { imageUrl: 'https://i.pinimg.com/236x/b6/41/c0/b641c07eaa92b04cb2d322d42a2525bd.jpg' },
  { imageUrl: 'https://i.pinimg.com/236x/c9/6e/f9/c96ef9c413a77eccf10429eb74453868.jpg' },
  { imageUrl: 'https://i.pinimg.com/236x/ea/34/b8/ea34b81c2e4ebac6d9aea1eadfcc4a6e.jpg' },
  { imageUrl: 'https://i.pinimg.com/236x/cb/0b/ca/cb0bca51a1faa1167560daf0193c999c.jpg' },
  { imageUrl: 'https://i.pinimg.com/236x/d2/17/aa/d217aad2effeb974bdcce61cd5ff5482.jpg' },
  { imageUrl: 'https://i.pinimg.com/236x/71/2a/32/712a328f7e0ae0fb06a58a29ed888178.jpg' },
  { imageUrl: 'https://i.pinimg.com/236x/67/a2/d0/67a2d035a6b8fc0444b92154dc995859.jpg' },
];
