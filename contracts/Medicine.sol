pragma solidity ^0.5.16;

contract Medicine
{
    address payable manufacturer;
    string medicine_name;
    uint256 medicine_price;
    uint256 medicine_id;
    uint256 medicine_quantity;
    string description;
    
    constructor(address payable _Manufacturer,
    string memory _medicine_name,
    uint256 _medicine_id,
    uint256 _medicine_price,
    uint256 _medicine_quantity,
    string memory _description) public
    {
        manufacturer=_Manufacturer;
        medicine_name=_medicine_name;
        medicine_id=_medicine_id;
        medicine_price=_medicine_price;
        medicine_quantity=_medicine_quantity;
        description=_description;
    }
    
    function getMedicineDetails() public view returns(address Manufacturer,
    string memory Medicine_name,
    uint256 Medicine_id,
    uint256 Medicine_price,
    uint256 Medicine_quantity,
    string memory Description) 
    {
        Manufacturer=manufacturer;
        Medicine_name=medicine_name;
        Medicine_id=medicine_id;
        Medicine_price=medicine_price;
        Medicine_quantity=medicine_quantity;
        Description=description;        
    }
}