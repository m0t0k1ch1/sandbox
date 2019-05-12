#pragma once

#include <eosio/eosio.hpp>
#include "authority.hpp"

using namespace eosio;

class [[eosio::contract]] controller : public contract
{
  public:

    controller(name receiver, name code, datastream<const char*> ds) : contract(receiver, code, ds) {};

    [[eosio::action]]
    void execute(name acnt, name act, std::vector<char> data, authority auth_before, authority auth_after);

  private:

    void execute_action(name acnt, name act, std::vector<char> data);
    void update_auth(authority auth);
};
