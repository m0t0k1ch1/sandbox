#pragma once

#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>

using namespace eosio;

using std::string;

class [[eosio::contract]] account : public contract
{
  public:

    using contract::contract;

    [[eosio::action]]
    void ping();

    void ontransfer(const name& from, const name& to, const asset& quantity, const string& memo);
};

extern "C"
{
  void apply(uint64_t receiver, uint64_t code, uint64_t action)
  {
    if (code == name("eosio.token").value && action == name("transfer").value) {
      execute_action(name(receiver), name(code), &account::ontransfer);
    }
  }
};
