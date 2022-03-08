pragma solidity ^0.5.16;

contract Rawmaterial
{
    address payable supplier;
    string rawmaterial_name;
    uint256 rawmaterial_price;
    uint256 rawmaterial_id;
    uint256 rawmaterial_quantity;
    string description;
    
    constructor(address payable _Supplier,
    string memory _rawmaterial_name,
    uint256 _rawmaterial_id,
    uint256 _rawmaterial_price,
    uint256 _rawmaterial_quantity,
    string memory _description) public
    {
        supplier=_Supplier;
        rawmaterial_name=_rawmaterial_name;
        rawmaterial_id=_rawmaterial_id;
        rawmaterial_price=_rawmaterial_price;
        rawmaterial_quantity=_rawmaterial_quantity;
        description=_description;
    }
    
    function getRawMaterialDetails() public view returns(address Supplier,
    string memory Rawmaterial_name,
    uint256 Rawmaterial_id,
    uint256 Rawmaterial_price,
    uint256 Rawmaterial_quantity,
    string memory Description) 
    {
        Supplier=supplier;
        Rawmaterial_name=rawmaterial_name;
        Rawmaterial_id=rawmaterial_id;
        Rawmaterial_price=rawmaterial_price;
        Rawmaterial_quantity=rawmaterial_quantity;
        Description=description;        
    }
}