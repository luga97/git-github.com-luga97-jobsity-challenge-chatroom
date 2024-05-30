import {ChatRoomsListItem} from "./ChatRoomsListItem"

export function RoomList() {
  return (
    <ul className="scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-200  gap-4 overflow-y-scroll pr-4 flex flex-col">
      <ChatRoomsListItem
        title="sala 1"
        participants={10}
        description="lahdkjasdhjask ashkdjhaskjdha asjdhakj ahsjkdhaskjdhas"
        userBellow={false}
      />
      <ChatRoomsListItem
        title="sala 2"
        participants={10}
        description="lahdkjasdhjask ashkdjhaskjdha asjdhakj ahsjkdhaskjdhas"
        userBellow={true}
      />
      <ChatRoomsListItem
        title="sala 3"
        participants={10}
        description="lahdkjasdhjask ashkdjhaskjdha asjdhakj ahsjkdhaskjdhas"
        userBellow={true}
      />
      <ChatRoomsListItem
        title="sala 4"
        participants={10}
        description="lahdkjasdhjask ashkdjhaskjdha asjdhakj ahsjkdhaskjdhas"
        userBellow={true}
      />
      <ChatRoomsListItem
        title="sala 5"
        participants={10}
        description="lahdkjasdhjask ashkdjhaskjdha asjdhakj ahsjkdhaskjdhas"
        userBellow={false}
      />
      <ChatRoomsListItem
        title="sala 6"
        participants={10}
        description="lahdkjasdhjask ashkdjhaskjdha asjdhakj ahsjkdhaskjdhas"
        userBellow={true}
      />
      <ChatRoomsListItem
        title="sala 7"
        participants={10}
        description="lahdkjasdhjask ashkdjhaskjdha asjdhakj ahsjkdhaskjdhas"
        userBellow={true}
      />
      <ChatRoomsListItem
        title="sala 8"
        participants={10}
        description="lahdkjasdhjask ashkdjhaskjdha asjdhakj ahsjkdhaskjdhas"
        userBellow={true}
      />
      <ChatRoomsListItem
        title="sala 9"
        participants={10}
        description="lahdkjasdhjask ashkdjhaskjdha asjdhakj ahsjkdhaskjdhas"
        userBellow={true}
      />
      <ChatRoomsListItem
        title="sala 10"
        participants={10}
        description="lahdkjasdhjask ashkdjhaskjdha asjdhakj ahsjkdhaskjdhas"
        userBellow={true}
      />
      <ChatRoomsListItem
        title="sala 6"
        participants={10}
        description="lahdkjasdhjask ashkdjhaskjdha asjdhakj ahsjkdhaskjdhas"
        userBellow={true}
      />
      <ChatRoomsListItem
        title="sala 6"
        participants={10}
        description="lahdkjasdhjask ashkdjhaskjdha asjdhakj ahsjkdhaskjdhas"
        userBellow={true}
      />
    </ul>
  )
}
