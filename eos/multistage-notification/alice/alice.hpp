#pragma once

#include <eosio/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] alice : public contract
{
  public:

    using contract::contract;

    [[eosio::action]]
    void ping();

    void onnotify(const name& target);
};

extern "C"
{
  void apply(uint64_t receiver, uint64_t code, uint64_t action)
  {
    if (action == name("notify").value) {
      execute_action(name(receiver), name(code), &alice::onnotify);
    }
  }
};
