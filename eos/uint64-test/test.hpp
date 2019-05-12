#pragma once

#include <eosio/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] test : public contract
{
  public:

    test(name receiver, name code, datastream<const char*> ds) :
      contract(receiver, code, ds),
      numbers(_self, _self.value)
    {};

    [[eosio::action]]
    void setnumber(name me, uint64_t value);

  private:

    struct [[eosio::table]] number
    {
      name     key;
      uint64_t value;
      uint64_t primary_key() const { return key.value; };
    };
    typedef multi_index<name("numbers"), number> number_index;

    number_index numbers;
};
