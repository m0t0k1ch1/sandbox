#pragma once

#include <eosio/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] proxy : public contract {

  using contract::contract;

  public:

    [[eosio::action]]
    void increment(name me);

};
