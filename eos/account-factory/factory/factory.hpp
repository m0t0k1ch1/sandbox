#pragma once

#include <eosio/eosio.hpp>
#include "authority.hpp"

using namespace eosio;

class [[eosio::contract]] factory : public contract
{
  public:

    using contract::contract;

    [[eosio::action]]
    void create(const name& account, const authority& auth_owner, const authority& auth_active, uint32_t ram_bytes);
};
