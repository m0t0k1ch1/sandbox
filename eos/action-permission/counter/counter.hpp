#pragma once

#include <eosio/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] counter : public contract
{
  public:

    counter(name receiver, name code, datastream<const char*> ds) :
      contract(receiver, code, ds),
      counts(_self, _self.value)
    {};

    [[eosio::action]]
    void increment(name me);

  private:

    struct [[eosio::table]] count
    {
      name     key;
      uint64_t val;
      uint64_t primary_key() const { return key.value; };
    };
    typedef multi_index<name("counts"), count> count_index;

    count_index counts;
};
