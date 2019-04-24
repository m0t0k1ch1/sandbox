cmake_minimum_required(VERSION 3.5)
find_package(eosio.cdt)
include_directories(.)
add_contract(counter counter counter.cpp)
