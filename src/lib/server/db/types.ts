import type { Member, MemberFilter } from '$lib/models/member';
import type { Visit, VisitFilter } from '$lib/models/visit';
import type { Purpose, PurposeFilter } from '$lib/models/purpose';

interface ResourceService<
	Resource extends { id: unknown },
	Filters extends Record<string, unknown>
> {
	find(filters: Filters): Promise<Resource[]>;
	get(id: Resource['id']): Promise<Resource>;
	add(data: Partial<Resource>): Promise<Resource>;
	update(id: Resource['id'], data: Omit<Resource, 'id'>): Promise<Resource>;
	remove(id: Resource['id']): Promise<boolean>;
}

export type MembersService = ResourceService<Member, MemberFilter>;
export type VisitsService = ResourceService<Visit, VisitFilter> & {
	findTodays(): Promise<Visit[]>;
};
export type PurposesService = ResourceService<Purpose, PurposeFilter>;
