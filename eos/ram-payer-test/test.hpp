#pragma once

#include <eosio/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] test : public contract
{
  public:

    test(name receiver, name code, datastream<const char*> ds) :
      contract(receiver, code, ds),
      users(_self, _self.value)
    {};

    [[eosio::action]]
    void adduser(name me, std::string memo, name ram_payer);

    [[eosio::action]]
    void moduser(name me, std::string memo);

  private:

    struct [[eosio::table]] user
    {
      name        key;
      std::string memo;
      uint64_t primary_key() const { return key.value; };
    };
    typedef multi_index<name("users"), user> user_index;

    user_index users;
};
