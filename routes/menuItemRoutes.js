const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');



// POST route to add a menu
router.post('/', async (req, res) => {
  try {
    const menuItemData = req.body;
    const menuItem = new MenuItem(menuItemData);
    const response = await menuItem.save();
    console.log("Menu Item Saved");
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server error");
  }
})

//GET method to get the menuItem
router.get('/', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('Data Fetche');
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    console.error('Error fetching menu items:', error);
  }
})

router.get('/:taste', async(req, res) => {
  try {
    const tasteType = req.params.taste;
    console.log('TasteType:',tasteType)
    if (tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour') {
      const menuItem = await MenuItem.find({ taste: tasteType });
      console.log("response fetched")
      res.status(200).json(menuItem);

    } else {
      res.status(404).json('Invalid Taste Type');
    }
  } catch (error) {
    res.status(500).json('Internal Server Error')
  }

})

// Update Menu Item Method API
router.put('/:id',async(req,res)=>{
  try{
const menuId = req.params.id;
const updatedMenuData = req.body;
const response = await MenuItem.findByIdAndUpdate(menuId,updatedMenuData,{
  new:true,
  runValidators:true,
})
if(!response){
  return res.status(404).json({error:'Menu item not found'});
}
console.log("Menu item updated successfully");
res.status(200).json(response);
  }catch(error){
res.status(500).json({error:'Internal server error'})
  }
})

// Delete Menu Item Method API
router.delete('/:id',async(req,res)=>{
  try{
    const menuId = req.params.id;
    const deleteMenu = await MenuItem.findByIdAndDelete(menuId);
    if(!deleteMenu){
      return res.status(404).json({error:'Menu not found'});
    }
    res.status(200).json({message:'Menu delete successfully'})

  }catch(error){
res.status(500).json({error:'Internal server error'})
  }
})

module.exports = router;
