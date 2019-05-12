#pragma once

#include <eosio/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] proxy : public contract
{
  public:

    proxy(name receiver, name code, datastream<const char*> ds) : contract(receiver, code, ds) {};

    [[eosio::action]]
    void increment(name me);
};
