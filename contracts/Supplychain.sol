pragma solidity ^0.5.16;

import "./Rawmaterial.sol";
import "./Medicine.sol";
contract Supplychain
{
    uint256 private rcount = 0;
    uint256 private mcount = 0;
    Rawmaterial[] private rawmaterials;
    Medicine[] private medicines;
    mapping(uint256=>Rawmaterial) rawmaterialdetails;
    mapping(uint256=>Medicine) medicinedetails;

    mapping(uint256=>uint256) rawmaterialprice;
    mapping(uint256=>uint256) medicineprice;
    mapping(uint256=>uint256) rawmaterialquantity;
    mapping(uint256=>uint256) medicinequantity;
    mapping(uint256=>address payable) PaySupplier;
    mapping(uint256=>address payable) PayManufacturer;

    mapping (address => bool) Supplieraddresses;
    mapping (address => bool) Manufactureraddresses;
    mapping (address => bool) Pharmacyaddresses;
    address payable [] Supplieraddress;
    address payable [] Manufactureraddress;
    address payable [] Pharmacyaddress;

    mapping(address=>Rawmaterial[]) SupplierSpecificRawmaterials;
    mapping(address=>Medicine[]) ManufacturerSpecificMedicines;
    mapping(address=>Rawmaterial[]) RawmaterialSpecifictoManufacturer;
    mapping(address=>Medicine[]) MedicineSpecifictoPharmacy;
    
    mapping(uint256=> Rawmaterial[]) RawmaterialsforMedicine;
    mapping(address=>address[]) ManufacturerstoSuppliers;
    mapping(address=>address[]) PharmaciestoManufacturers;

    mapping(uint256=>address[]) RawmaterialorderedbyManufacturers;
    mapping(uint256=>address[]) MedicineorderedbyPharmacies;
    mapping(address=> mapping(uint256=>uint256)) RawmaterialQuantityinManufacturer;
    mapping(address=> mapping(uint256=>uint256)) MedicineQuantityinPharmacy;
    mapping(address=>mapping(uint=>bool)) CheckDuplicatesinRawmaterials;
    mapping(address=>mapping(uint=>bool)) CheckDuplicatesinMedicines;
    mapping(address=>mapping(uint=>bool)) CheckMedicines;
    mapping(uint=>mapping(uint=>bool)) CheckduplicatesinRawmaterialstoMedicines;

    constructor() public{}
/******/    
    function registerSupplier()external
    {
        require(Pharmacyaddresses[msg.sender]!=true);
        require(Manufactureraddresses[msg.sender]!=true);
        Supplieraddresses[msg.sender]=true;
        Supplieraddress.push(msg.sender);
    }
    
    function registerManufacturer()external
    { 
        require(Pharmacyaddresses[msg.sender]!=true);
        require(Supplieraddresses[msg.sender]!=true);
        Manufactureraddresses[msg.sender]=true;
        Manufactureraddress.push(msg.sender);
    }
    
    function registerPharmacy()external
    {
        require(Manufactureraddresses[msg.sender]!=true);
        require(Supplieraddresses[msg.sender]!=true);
        Pharmacyaddresses[msg.sender]=true;
        Pharmacyaddress.push(msg.sender);
    }
    
    function checkSupplier(address supplier) external view returns(bool)
    {
        return Supplieraddresses[supplier];
    }
    
    function checkManufacturer(address manufacturer) external view returns(bool)
    {
        return Manufactureraddresses[manufacturer];
    }
    
    function checkPharmacy(address pharma) external view returns(bool)
    {
        return Pharmacyaddresses[pharma];
    }
/******/    
    event Rawmaterialadded(address contractAddress,address Supplieraddress,string name,uint256 id,uint256 price,uint256 quantity,string description);
    
    function addRawmaterial(
        string memory _rawmaterial_name,
        uint256 _rawmaterial_price,
        uint256 _rawmaterial_quantity,
        string memory _description
    )public
    {
        require(Supplieraddresses[msg.sender]==true,"Invalid Supplier");
        rcount += 1;
        Rawmaterial _rawmaterial= new Rawmaterial(msg.sender,_rawmaterial_name,rcount,_rawmaterial_price,_rawmaterial_quantity,_description);
        emit Rawmaterialadded(address(_rawmaterial),msg.sender,_rawmaterial_name,rcount,_rawmaterial_price,_rawmaterial_quantity,_description);
        rawmaterials.push(_rawmaterial);
        rawmaterialdetails[rcount]=_rawmaterial;
        PaySupplier[rcount]=msg.sender;
        rawmaterialprice[rcount]=_rawmaterial_price;
        rawmaterialquantity[rcount]=_rawmaterial_quantity;
        SupplierSpecificRawmaterials[msg.sender].push(_rawmaterial);
    }
    
    event Medicineadded(address contractAddress,address Manufacturaddress,string name,uint256 id,uint256 price,uint256 quantity,string description);
    
    function addMedicine(
        string memory _medicine_name,
        uint256 _medicine_price,
        uint256 _medicine_quantity,
        string memory _description
    ) public
    {
        require(Manufactureraddresses[msg.sender]==true,"Invalid Manufacturer");
        mcount += 1;
        Medicine _medicine=new Medicine(msg.sender,_medicine_name,mcount,_medicine_price,_medicine_quantity,_description);
        emit Medicineadded(address(_medicine),msg.sender,_medicine_name,mcount,_medicine_price,_medicine_quantity,_description);
        medicines.push(_medicine);
        medicinedetails[mcount]=_medicine;
        PayManufacturer[mcount]=msg.sender;
        medicineprice[mcount]=_medicine_price;
        medicinequantity[mcount]=_medicine_quantity;
        ManufacturerSpecificMedicines[msg.sender].push(_medicine);
        CheckMedicines[msg.sender][mcount]=true;
    }
/******/
    function returnspecificRawmaterials(uint256 id) public view returns(Rawmaterial)
    {
        return rawmaterialdetails[id];
    }

    function returnspecificMedicines(uint256 id) public view returns(Medicine)
    {
        return medicinedetails[id];
    }

    function returnAllMedicines() external view returns(Medicine[] memory)
    {
        return medicines;
    }

    function returnAllRawMaterials() external view returns(Rawmaterial[] memory)
    {
        return rawmaterials;
    }

/******/   
    
    function returnRawmaterialOwner(uint256 id) external view returns(address payable)
    {
        return PaySupplier[id];
    }
    
    function returnMedicineOwner(uint256 id) external view returns(address payable)
    {
        return PayManufacturer[id];
    }

    function returnMedicinequantity(uint256 id) external view returns(uint256)
    {
        return medicinequantity[id];
    }
    
    function returnRawmaterialquantity(uint256 id) external view returns(uint256)
    {
        return rawmaterialquantity[id];
    }
    
    function returnrawmaterialprice(uint256 _id) public view returns(uint256)
    {
        return rawmaterialprice[_id];
    }
    
    function returnmedicineprice(uint256 _id) public view returns(uint256)
    {
        return medicineprice[_id];
    }

/******/  
    function returnAllSuppliers() external view returns(address payable[] memory)
    {
        return Supplieraddress;
    }

    function returnAllManufacturers() external view returns(address payable[] memory)
    {
        return Manufactureraddress;
    }

    function returnAllPharmacies() external view returns(address payable[] memory)
    {
        return Pharmacyaddress;
    }
/******/ 
    
    function returnRawmaterialsprovidedbySupplier(address supplier) public view returns(Rawmaterial[] memory)
    {
        return SupplierSpecificRawmaterials[supplier];
    }

    function returnRawmaterialsSpecifictoManufacturer(address manufacturer) public view returns(Rawmaterial[] memory)
    {
        return RawmaterialSpecifictoManufacturer[manufacturer];
    }

    function returnMedicinesprovidedbyManufacturer(address manufacturer) public view returns(Medicine[] memory)
    {
        return ManufacturerSpecificMedicines[manufacturer];
    }

    function returnMedicinesSpecifictoPharmacy(address pharmacy) public view returns(Medicine[] memory)
    {
        return MedicineSpecifictoPharmacy[pharmacy];
    }


/******/  

    function returnRawmaterialsforMedicines(uint256 id) external view returns(Rawmaterial[] memory)
    {
        return RawmaterialsforMedicine[id];
    }

    function returnManufacturerstoSuppliers(address _ad) public view returns(address[] memory)
    {
        return ManufacturerstoSuppliers[_ad];
    }
    function returnRawmaterialsOrderedbyManufacturer(uint256 _rawmaterial_id) public view returns(address [] memory)
    {
        return RawmaterialorderedbyManufacturers[_rawmaterial_id];
    }

    function returnMedicinesOrderedbyPharmacies(uint256 _medicine_id) public view returns(address [] memory)
    {
        return MedicineorderedbyPharmacies[_medicine_id];
    }

    function returnPharmaciestoManufacuturers(address _manufacturerad) public view returns(address[] memory)
    {
        return PharmaciestoManufacturers[_manufacturerad];
    }
    function returnRawmaterialQuantityinManufacturers(address _manufactad, uint256 _rawmatid)public view returns(uint256)
    {
        return RawmaterialQuantityinManufacturer[_manufactad][_rawmatid];
    }

    function returnMedicineQuantityinPharmacy(address _Pharmacyad, uint256 _medicineid)public view returns(uint256)
    {
        return MedicineQuantityinPharmacy[_Pharmacyad][_medicineid];
    }
    
    function checkRawmaterialquantity(uint256 _id,uint256 _quantity) public view returns(bool)
    {
        if(rawmaterialquantity[_id]>=_quantity)
        {
            return true;
        }
        else
            return false;  
    }
    
    function checkMedicinequantity(uint256 _id,uint256 _quantity) public view returns(bool)
    {
        if(medicinequantity[_id]>=_quantity)
        {
            return true;
        }
        else
            return false;
    }
/******/
    function orderRawmaterials(uint256 _rawmaterialid,uint256 _quantity) public payable returns(bool)
    {
        require(Manufactureraddresses[msg.sender]==true,"Only Manufacturers can access this function");
        require(rawmaterialquantity[_rawmaterialid]>=_quantity);
        ManufacturerstoSuppliers[PaySupplier[_rawmaterialid]].push(msg.sender);
        if(CheckDuplicatesinRawmaterials[msg.sender][_rawmaterialid]==false)
        {
            RawmaterialorderedbyManufacturers[_rawmaterialid].push(msg.sender);
            RawmaterialSpecifictoManufacturer[msg.sender].push(returnspecificRawmaterials(_rawmaterialid));
            CheckDuplicatesinRawmaterials[msg.sender][_rawmaterialid]=true;
        }
        rawmaterialquantity[_rawmaterialid]-=_quantity;
        RawmaterialQuantityinManufacturer[msg.sender][_rawmaterialid]+=_quantity;
        if(PaySupplier[_rawmaterialid].send(msg.value))
            return true;
        return false;
    }

    function rawmaterialstoMedicine(uint256 _medicineid,uint256 _rawmaterialid) public
    {
        require(Manufactureraddresses[msg.sender]==true,"Only Manufacturers can access this function");
        require(CheckDuplicatesinRawmaterials[msg.sender][_rawmaterialid]==true);
        require(CheckMedicines[msg.sender][_medicineid]==true);
        if(CheckduplicatesinRawmaterialstoMedicines[_medicineid][_rawmaterialid]==false)
        {
            RawmaterialsforMedicine[_medicineid].push(returnspecificRawmaterials(_rawmaterialid));
            CheckduplicatesinRawmaterialstoMedicines[_medicineid][_rawmaterialid]=true;
        }
        
    }
    
    function orderMedicines(uint256 _medicineid,uint256 _quantity) public payable returns(bool)
    {
        require(Pharmacyaddresses[msg.sender]==true,"Only permitted Pharmacy can access this function");
        require(medicinequantity[_medicineid]>=_quantity);
        PharmaciestoManufacturers[PayManufacturer[_medicineid]].push(msg.sender);
        if(CheckDuplicatesinMedicines[msg.sender][_medicineid]==false)
        {
            MedicineorderedbyPharmacies[_medicineid].push(msg.sender);
            MedicineSpecifictoPharmacy[msg.sender].push(returnspecificMedicines(_medicineid));
            CheckDuplicatesinMedicines[msg.sender][_medicineid]=true;
        }
        medicinequantity[_medicineid]-=_quantity;
        MedicineQuantityinPharmacy[msg.sender][_medicineid]+=_quantity;
        if(PayManufacturer[_medicineid].send(msg.value))
            return true;
        return false;
    }

}