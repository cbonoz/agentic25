// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {StampX} from "../src/StampX.sol";

contract StampXScript is Script {
    StampX public stampX;

    function setUp() public {}


    function run() public {
        vm.startBroadcast();

        stampX = new StampX();

        vm.stopBroadcast();
    }
}
