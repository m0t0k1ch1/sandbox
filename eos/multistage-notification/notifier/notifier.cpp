#include <eosio/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] notifier : public contract
{
  public:

   using contract::contract;

  [[eosio::action]]
  void notify(
    const name& target,
    const name& next_notifier,
    const name& next_target
  ) {
    print_f("[notifier] first_receiver: %\n", get_first_receiver());
    require_recipient(target);
  }
};
