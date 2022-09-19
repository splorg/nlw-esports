import { useEffect, useState } from "react";
import axios from "axios";

import * as Select from "@radix-ui/react-select";
import { CaretDown } from "phosphor-react";

interface Game {
  id: string
  title: string
}

interface Props {
  name: string
}

export const GameSelectInput = ({ name }: Props) => {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
  axios("http://localhost:3333/games")
    .then((response) => setGames(response.data))
  }, [])
  
  return (
    <Select.Root name={name}>
      <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm flex col-span-1 justify-between items-center">
        <Select.Value
          placeholder="Selecione o game que deseja jogar"
          className="color-zinc-300"
        />
        <CaretDown size={24} className="color-zinc-300" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.SelectViewport className="bg-zinc-900 py-4 text-white rounded-lg px-6">
            <Select.SelectGroup>
              {games.map((game) => {
                return (
                  <Select.SelectItem
                  key={game.id}
                  value={game.id}
                  className="mb-1 cursor-pointer rounded p-1 hover:bg-violet-300 hover:text-zinc-700 hover:border-none"
                  >
                    <Select.SelectItemText>{game.title}</Select.SelectItemText>
                  </Select.SelectItem>
                );
              })}
            </Select.SelectGroup>
          </Select.SelectViewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};