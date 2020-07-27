#pragma once

#include <eosio/eosio.hpp>
#include "authority.hpp"

using namespace eosio;

class [[eosio::contract]] factory : public contract
{
  public:

    factory(name receiver, name code, datastream<const char*> ds) : contract(receiver, code, ds), codes(get_self(), get_self().value) {}

    using contract::contract;

    [[eosio::action]]
    void create(const name& account, uint32_t ram_bytes);

    [[eosio::action]]
    void init(const name& account, const name& code_key, const authority& auth_owner, const authority& auth_active);

    [[eosio::action]]
    void setcode(const name& key, const std::vector<char>& value);

  private:

    struct [[eosio::table]] code {
      name              key;
      std::vector<char> value;
      uint64_t primary_key() const { return key.value; };
    };
    typedef eosio::multi_index<name("codes"), code> code_index;

    code_index codes;
};
