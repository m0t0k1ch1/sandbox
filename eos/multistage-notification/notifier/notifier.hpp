#pragma once

#include <eosio/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] notifier : public contract
{
  public:

   using contract::contract;

   [[eosio::action]]
   void notify(const name& target);
};
